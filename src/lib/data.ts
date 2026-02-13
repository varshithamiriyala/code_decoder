import type { Question, QuestionCategory } from './types';

const questions: Record<QuestionCategory, Question[]> = {
  'first-year': [
    {
      id: 1,
      description: 'What is the output of this simple multiplication?',
      input: '5',
      code: 'print(5 * 2)',
      answer: '10',
    },
    {
      id: 2,
      description: 'What does this string concatenation produce?',
      input: 'N/A',
      code: `print("Hello" + " " + "World")`,
      answer: 'Hello World',
    },
    {
      id: 3,
      description: 'What is the result of this integer division?',
      input: '10',
      code: 'print(10 // 3)',
      answer: '3',
    },
    {
      id: 4,
      description: 'Determine the final value of x.',
      input: 'x = 5\nx += 3',
      code: 'x = 5\nx += 3\nprint(x)',
      answer: '8',
    },
    {
        id: 5,
        description: "What will be printed?",
        input: "arr = [1, 2, 3]",
        code: "arr = [1, 2, 3]\nprint(len(arr))",
        answer: "3"
    }
  ],
  'senior-year': [
    {
      id: 1,
      description: 'Find the input `a` that results in the given output.',
      output: '25',
      code: 'a = int(input())\nprint(a * a)',
      answer: '5',
    },
    {
      id: 2,
      description: 'What input string, when reversed, produces the output?',
      output: 'gnidoc',
      code: `s = input()\nprint(s[::-1])`,
      answer: 'coding',
    },
    {
      id: 3,
      description: 'Find the number that gives this remainder when divided by 7.',
      output: '5',
      code: 'n = int(input())\nprint(n % 7)',
      answer: '12',
    },
    {
      id: 4,
      description: 'What is the base number for this power calculation?',
      output: '1000',
      code: 'b = int(input())\nprint(b ** 3)',
      answer: '10',
    },
    {
        id: 5,
        description: "What input list `l` will produce the given output?",
        output: "[1, 4, 9]",
        code: "l = eval(input())\nprint([x*x for x in l])",
        answer: "[1, 2, 3]"
    }
  ],
};

export function getQuestions(category: QuestionCategory): Question[] {
  const categoryQuestions = questions[category];
  // Fisher-Yates shuffle algorithm
  for (let i = categoryQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [categoryQuestions[i], categoryQuestions[j]] = [categoryQuestions[j], categoryQuestions[i]];
  }
  return categoryQuestions;
}

export function getAllQuestions() {
    return questions;
}
