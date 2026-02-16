import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, FileQuestion, Star } from "lucide-react";

export default function InstructionsPage({ params }: { params: { category: string } }) {
  const { category } = params;

  if (category !== 'input-to-output' && category !== 'output-to-input') {
    notFound();
  }

  const categoryTitle = category === 'input-to-output' ? 'Input to Output' : 'Output to Input';

  const instructions = [
    { icon: Clock, text: "Total time is 10 minutes." },
    { icon: FileQuestion, text: "Each correct answer carries 10 marks." },
    { icon: Star, text: "No negative marking for wrong answers." },
    { icon: CheckCircle2, text: "The timer will auto-submit when time ends." },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Instructions: {categoryTitle}</CardTitle>
          <CardDescription>Read the rules carefully before you begin.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-lg">
            {instructions.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <item.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-muted-foreground font-medium">Your score will be shown after submission.</p>
        </CardContent>
        <CardFooter>
          <Button asChild size="lg" className="w-full transition-transform hover:scale-105 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href={`/challenge/${category}`}>Start Challenge</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
