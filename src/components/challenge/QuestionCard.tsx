import type { Question, QuestionCategory } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuestionCardProps {
  question: Question;
  category: QuestionCategory;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
}

const CodeBlock = ({ code }: { code: string }) => (
    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
        <code className="font-code">{code}</code>
    </pre>
)

export function QuestionCard({ question, category, userAnswer, onAnswerChange }: QuestionCardProps) {

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Decode the Snippet</CardTitle>
        <CardDescription>{question.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {category === 'input-to-output' ? (
          <>
            <div>
              <Label className="font-semibold">Input:</Label>
              <CodeBlock code={question.input || 'N/A'} />
            </div>
            <div>
              <Label className="font-semibold">Code:</Label>
              <CodeBlock code={question.code} />
            </div>
            <div>
              <Label htmlFor="answer-input" className="font-semibold">Your Answer (Guess the Output):</Label>
              <Input
                id="answer-input"
                value={userAnswer || ''}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder="Type your answer here"
                autoComplete="off"
                onPaste={handlePaste}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label className="font-semibold">Expected Output:</Label>
              <CodeBlock code={question.output || 'N/A'} />
            </div>
            <div>
              <Label className="font-semibold">Code:</Label>
              <CodeBlock code={question.code} />
            </div>
            <div>
              <Label htmlFor="answer-input" className="font-semibold">Your Answer (Guess the Input):</Label>
              <Input
                id="answer-input"
                value={userAnswer || ''}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder="Type your answer here"
                autoComplete="off"
                onPaste={handlePaste}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
