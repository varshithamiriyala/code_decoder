import { notFound } from "next/navigation";
import { getQuestions } from "@/lib/data";
import type { QuestionCategory } from "@/lib/types";
import { ChallengeClient } from "@/components/challenge/ChallengeClient";

export default function ChallengePage({ params }: { params: { category: string } }) {
  const { category } = params;

  if (category !== 'input-to-output' && category !== 'output-to-input') {
    notFound();
  }
  
  const questions = getQuestions(category as QuestionCategory);

  return (
      <ChallengeClient questions={questions} category={category as QuestionCategory} />
  );
}
