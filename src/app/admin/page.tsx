'use client';

import { generateChallengeQuestion } from '@/ai/flows/generate-challenge-question-flow';
import type { GenerateChallengeQuestionOutput } from '@/ai/flows/generate-challenge-question-flow';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/Header';
import { getAllQuestions } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader2, TableIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type FormState = {
  data: GenerateChallengeQuestionOutput | null;
  error: string | null;
};

async function generateQuestionAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  'use server';
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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Generate Question
    </Button>
  );
}

const CodeBlock = ({ code }: { code: string }) => (
    <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
        <code className="font-code">{code}</code>
    </pre>
);

export default function AdminPage() {
  const [state, formAction] = useFormState(generateQuestionAction, { data: null, error: null });
  const allQuestions = getAllQuestions();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>AI Question Generator</CardTitle>
            <CardDescription>Use AI to generate a new challenge question. The generated question will not be automatically saved.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div>
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea id="prompt" name="prompt" placeholder="e.g., A simple question about array length in Python" required />
              </div>
              <div>
                <Label>Difficulty Level</Label>
                <Select name="difficultyLevel" defaultValue="InputToOutput" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="InputToOutput">Input to Output</SelectItem>
                    <SelectItem value="OutputToInput">Output to Input</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SubmitButton />
            </form>
            {state.error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{state.error}</AlertDescription></Alert>}
            {state.data && (
                <Card className="mt-4">
                    <CardHeader><CardTitle>Generated Question</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong>Description:</strong> {state.data.questionDescription}</p>
                        {state.data.suggestions && <Alert><AlertTitle>Suggestions</AlertTitle><AlertDescription>{state.data.suggestions}</AlertDescription></Alert>}
                        <p><strong>Input:</strong> <CodeBlock code={state.data.input} /></p>
                        <p><strong>Code:</strong> <CodeBlock code={state.data.code} /></p>
                        <p><strong>Expected Output:</strong> <CodeBlock code={state.data.expectedOutput} /></p>
                    </CardContent>
                </Card>
            )}
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TableIcon className="w-5 h-5" /> Existing Questions</CardTitle>
                <CardDescription>A list of all questions currently in the application.</CardDescription>
            </CardHeader>
            <CardContent>
                {Object.entries(allQuestions).map(([category, questions]) => (
                    <div key={category} className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 capitalize">{category.replace('-', ' ')}</h3>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Answer</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {questions.map(q => (
                                    <TableRow key={q.id}>
                                        <TableCell>{q.id}</TableCell>
                                        <TableCell>{q.description}</TableCell>
                                        <TableCell><CodeBlock code={q.answer} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ))}
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
