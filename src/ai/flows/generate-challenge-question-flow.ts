'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating coding challenge questions.
 * It allows an administrator to create new questions for different difficulty levels
 * by providing a prompt, and it can offer suggestions for improvement.
 *
 * - generateChallengeQuestion - A function that handles the question generation process.
 * - GenerateChallengeQuestionInput - The input type for the generateChallengeQuestion function.
 * - GenerateChallengeQuestionOutput - The return type for the generateChallengeQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const GenerateChallengeQuestionInputSchema = z.object({
  prompt: z.string().describe('A natural language description of the desired coding challenge question.'),
  difficultyLevel: z.enum(['FirstYear', 'SeniorYear']).describe('The difficulty level for the question. "FirstYear" requires guessing output from input/code. "SeniorYear" requires guessing input from code/output.'),
});
export type GenerateChallengeQuestionInput = z.infer<typeof GenerateChallengeQuestionInputSchema>;

// Output Schema
const GenerateChallengeQuestionOutputSchema = z.object({
  questionDescription: z.string().describe('A brief description of the generated question based on the prompt.'),
  input: z.string().describe('The input value for the code snippet. For "FirstYear" challenges, this is shown to the user. For "SeniorYear" challenges, this is the hidden correct answer.'),
  code: z.string().describe('The code snippet for the challenge.'),
  expectedOutput: z.string().describe('The expected output when the code snippet is run with the provided input. For "FirstYear" challenges, this is the hidden correct answer. For "SeniorYear" challenges, this is shown to the user.'),
  suggestions: z.string().optional().describe('Optional suggestions if the prompt was unclear or the generated question needs refinement.'),
});
export type GenerateChallengeQuestionOutput = z.infer<typeof GenerateChallengeQuestionOutputSchema>;

// Wrapper function
export async function generateChallengeQuestion(input: GenerateChallengeQuestionInput): Promise<GenerateChallengeQuestionOutput> {
  return generateChallengeQuestionFlow(input);
}

// Genkit Prompt Definition
const questionGeneratorPrompt = ai.definePrompt({
  name: 'generateChallengeQuestionPrompt',
  input: { schema: GenerateChallengeQuestionInputSchema },
  output: { schema: GenerateChallengeQuestionOutputSchema },
  prompt: `You are an expert coding challenge question generator for competitive programming events.
Your task is to create a single coding challenge question based on the user's prompt and specified difficulty level.
The question should be concise, clear, and solvable.

Difficulty Level: {{{difficultyLevel}}}

User Prompt: "{{{prompt}}}"

When generating the question, consider the following for the specified difficulty level:
- If Difficulty Level is 'FirstYear':
  - The challenge shows an 'Input' and a 'Code Snippet'.
  - The user must guess the 'Expected Output'.
  - Therefore, you should provide the 'input', 'code', and the 'expectedOutput' that the user needs to guess.
- If Difficulty Level is 'SeniorYear':
  - The challenge shows an 'Expected Output' and a 'Code Snippet' (with a placeholder for input).
  - The user must guess the 'Input' that produces the 'Expected Output'.
  - Therefore, you should provide the 'input' (which will be the correct answer the user must provide), the 'code' (which should contain a variable or placeholder for the input), and the 'expectedOutput'.

Ensure the 'code' snippet is simple and self-contained, typically a single print statement or a small function without complex imports.

If the user's prompt is ambiguous, unclear, or you cannot generate a suitable question, explain why in the 'suggestions' field and try to make a reasonable question if possible, or leave fields empty if not.

Provide a brief 'questionDescription' summarizing the challenge you created.

Example for 'FirstYear':
{
  "questionDescription": "A simple multiplication problem.",
  "input": "5",
  "code": "print(5 * 2)",
  "expectedOutput": "10",
  "suggestions": ""
}

Example for 'SeniorYear':
{
  "questionDescription": "Find the input that squares to the given output.",
  "input": "5",
  "code": "a = int(input())\nprint(a * a)",
  "expectedOutput": "25",
  "suggestions": ""
}
`,
});

// Genkit Flow Definition
const generateChallengeQuestionFlow = ai.defineFlow(
  {
    name: 'generateChallengeQuestionFlow',
    inputSchema: GenerateChallengeQuestionInputSchema,
    outputSchema: GenerateChallengeQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await questionGeneratorPrompt(input);
    if (!output) {
      throw new Error('Failed to generate challenge question.');
    }
    return output;
  }
);
