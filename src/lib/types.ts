export type QuestionCategory = 'input-to-output' | 'output-to-input';

export type Question = {
  id: number;
  description: string;
  input?: string;
  code: string;
  output?: string;
  answer: string;
};
