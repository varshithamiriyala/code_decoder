export type QuestionCategory = 'first-year' | 'senior-year';

export type Question = {
  id: number;
  description: string;
  input?: string;
  code: string;
  output?: string;
  answer: string;
};
