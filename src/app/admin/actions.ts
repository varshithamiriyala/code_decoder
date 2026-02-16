'use server';

import { generateChallengeQuestion } from '@/ai/flows/generate-challenge-question-flow';
import type { GenerateChallengeQuestionOutput } from '@/ai/flows/generate-challenge-question-flow';

export type FormState = {
  data: GenerateChallengeQuestionOutput | null;
  error: string | null;
};

export async function generateQuestionAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const prompt = formData.get('prompt') as string;
  const difficultyLevel = formData.get('difficultyLevel') as 'InputToOutput' | 'OutputToInput';

  if (!prompt || !difficultyLevel) {
    return { data: null, error: 'Prompt and difficulty level are required.' };
  }

  try {
    const result = await generateChallengeQuestion({ prompt, difficultyLevel });
    return { data: result, error: null };
  } catch (e: any) {
    return { data: null, error: e.message || 'An unknown error occurred.' };
  }
}
