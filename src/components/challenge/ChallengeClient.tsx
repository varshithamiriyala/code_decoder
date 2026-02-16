'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Question, QuestionCategory } from '@/lib/types';
import { QuestionCard } from './QuestionCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/Header';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CHALLENGE_DURATION = 10 * 60; // 10 minutes in seconds

export function ChallengeClient({ questions, category }: { questions: Question[]; category: QuestionCategory }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const [isMounted, setIsMounted] = useState(false);

  const finishChallenge = useCallback(() => {
    let score = 0;
    let correctAnswersCount = 0;
    questions.forEach((q, index) => {
      if (q.answer.trim().toLowerCase() === (userAnswers[index] || '').trim().toLowerCase()) {
        score += 10;
        correctAnswersCount++;
      }
    });

    localStorage.removeItem('challengeEndTime');
    localStorage.removeItem('userAnswers');

    router.replace(`/results?score=${score}&total=${questions.length}&correct=${correctAnswersCount}`);
  }, [questions, userAnswers, router]);
  
  useEffect(() => {
    setIsMounted(true);
    const storedAnswers = localStorage.getItem('userAnswers');
    if (storedAnswers) {
        setUserAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const endTime = localStorage.getItem('challengeEndTime');
    const now = Date.now();

    if (endTime && parseInt(endTime, 10) > now) {
      setTimeLeft(Math.round((parseInt(endTime, 10) - now) / 1000));
    } else {
      localStorage.setItem('challengeEndTime', (now + CHALLENGE_DURATION * 1000).toString());
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          finishChallenge();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMounted, finishChallenge]);
  
  useEffect(() => {
    if (isMounted) {
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    }
  }, [userAnswers, isMounted]);

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishChallenge();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isMounted) {
    return <div className="flex items-center justify-center min-h-screen">Loading Challenge...</div>;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header>
        <div className="flex items-center gap-2 font-mono text-lg font-bold bg-accent text-accent-foreground px-3 py-1 rounded-md">
          <Clock className="w-5 h-5" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </Header>
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-6">
            <div>
                <p className="text-center text-sm font-medium text-muted-foreground mb-2">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <Progress value={progress} className="w-full h-2" />
            </div>

          <QuestionCard
            question={questions[currentQuestionIndex]}
            category={category}
            userAnswer={userAnswers[currentQuestionIndex]}
            onAnswerChange={handleAnswerChange}
          />
          <Button onClick={handleNext} className="w-full" size="lg">
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish & See Score'}
          </Button>
        </div>
      </main>
    </div>
  );
}
