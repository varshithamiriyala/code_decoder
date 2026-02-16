import type { Question, QuestionCategory } from './types';

const questions: Record<QuestionCategory, Question[]> = {
  'input-to-output': [
    {
      id: 1,
      description: 'What is the output of this code that prints squares of numbers?',
      input: '5',
      code: 'n = int(input())\nfor i in range(1, n+1):\n    print(i * i, end=" ")',
      answer: '1 4 9 16 25',
    },
    {
      id: 2,
      description: 'Calculate the factorial of the given number.',
      input: '4',
      code: 'n = int(input())\nfact = 1\nfor i in range(1, n+1):\n    fact *= i\nprint(fact)',
      answer: '24',
    },
    {
      id: 3,
      description: 'What happens when you reverse this number as a string?',
      input: '1234',
      code: 'n = input()\nprint(n[::-1])',
      answer: '4321',
    },
    {
      id: 4,
      description: 'How many divisors does this number have?',
      input: '6',
      code: 'n = int(input())\ncount = 0\nfor i in range(1, n+1):\n    if n % i == 0:\n        count += 1\nprint(count)',
      answer: '4',
    },
    {
      id: 5,
      description: 'What pattern does this nested loop print?',
      input: '3',
      code: 'n = int(input())\nfor i in range(n):\n    for j in range(i+1):\n        print("*", end="")\n    print()',
      answer: '*\n**\n***',
    },
    {
      id: 6,
      description: 'Generate the first N terms of the Fibonacci sequence.',
      input: '5',
      code: 'n = int(input())\na, b = 0, 1\nfor i in range(n):\n    print(a, end=" ")\n    a, b = b, a + b',
      answer: '0 1 1 2 3',
    },
    {
      id: 7,
      description: 'Classic FizzBuzz: What is the output for this number?',
      input: '9',
      code: 'n = int(input())\nif n % 3 == 0 and n % 5 == 0:\n    print("FizzBuzz")\nelif n % 3 == 0:\n    print("Fizz")\nelif n % 5 == 0:\n    print("Buzz")\nelse:\n    print(n)',
      answer: 'Fizz',
    },
    {
      id: 8,
      description: 'Print numbers in reverse order from N down to 1.',
      input: '4',
      code: 'n = int(input())\nfor i in range(n, 0, -1):\n    print(i, end=" ")',
      answer: '4 3 2 1',
    }
  ],
  'output-to-input': [
    {
      id: 1,
      description: 'Find the input `n` that produces the sum of the first `n` natural numbers.',
      output: '21',
      code: 'n = int(input())\nprint(n * (n + 1) // 2)',
      answer: '6',
    },
    {
      id: 2,
      description: 'What number, when its digits are reversed, gives this output?',
      output: '321',
      code: 'n = int(input())\nrev = 0\nwhile n > 0:\n    rev = rev * 10 + n % 10\n    n //= 10\nprint(rev)',
      answer: '123',
    },
    {
      id: 3,
      description: 'Find the upper limit `n` to print all even numbers up to this output.',
      output: '2 4 6 8',
      code: 'n = int(input())\nfor i in range(1, n+1):\n    if i % 2 == 0:\n        print(i, end=" ")',
      answer: '8',
    },
    {
      id: 4,
      description: 'Which term `n` in the Fibonacci sequence results in this output?',
      output: '8',
      code: 'n = int(input())\na, b = 0, 1\nfor i in range(n):\n    a, b = b, a + b\nprint(a)',
      answer: '6',
    },
    {
        id: 5,
        description: 'Provide a prime number as input.',
        output: 'Prime',
        code: 'n = int(input())\ncount = 0\nfor i in range(1, n+1):\n    if n % i == 0:\n        count += 1\nprint("Prime" if count == 2 else "Not Prime")',
        answer: '13',
    },
    {
        id: 6,
        description: 'What number has a digit length equal to the output?',
        output: '4',
        code: 'n = int(input())\nprint(len(str(n)))',
        answer: '1000'
    },
    {
        id: 7,
        description: 'Find the input `n` that generates the first `n` cubic numbers.',
        output: '1 8 27',
        code: 'n = int(input())\nfor i in range(1, n+1):\n    print(i*i*i, end=" ")',
        answer: '3',
    },
    {
        id: 8,
        description: 'What input `n` is needed to get this sum of numbers from 0 to n-1?',
        output: '10',
        code: 'n = int(input())\ntotal = 0\nfor i in range(n):\n    total += i\nprint(total)',
        answer: '5',
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
