'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Check, Percent, Trophy } from 'lucide-react';

export function ResultsClient() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score') || '0';
  const totalQuestions = searchParams.get('total') || '0';
  const correct = searchParams.get('correct') || '0';

  const scoreNum = parseInt(score, 10);
  const totalNum = parseInt(totalQuestions, 10);
  const correctNum = parseInt(correct, 10);

  const percentage = totalNum > 0 ? (correctNum / totalNum) * 100 : 0;

  let performanceMessage = 'Good Try!';
  let performanceIcon = <Trophy className="w-16 h-16 text-yellow-500" />;
  if (percentage >= 90) {
    performanceMessage = 'Excellent!';
    performanceIcon = <Award className="w-16 h-16 text-green-500" />;
  } else if (percentage >= 70) {
    performanceMessage = 'Very Good!';
    performanceIcon = <Trophy className="w-16 h-16 text-blue-500" />;
  }
  
  return (
    <Card className="w-full max-w-md text-center animate-fade-in-up">
      <CardHeader>
        <div className="mx-auto mb-4">{performanceIcon}</div>
        <CardTitle className="text-4xl font-bold">{performanceMessage}</CardTitle>
        <CardDescription>Here is your performance summary.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
                <Check className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{correctNum}/{totalNum}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
                <Percent className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{percentage.toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
            <div className="p-4 bg-accent text-accent-foreground rounded-lg">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{scoreNum}</p>
                <p className="text-sm">Total Score</p>
            </div>
        </div>

        <Button asChild size="lg" className="w-full mt-6">
          <Link href="/">Play Again</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
