import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/Logo";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover -z-10 opacity-20"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0" />
      <Card className="w-full max-w-md text-center z-10 shadow-2xl animate-fade-in-up">
        <CardHeader>
          <div className="mx-auto mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Code Decoder
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            The ultimate code decoding challenge. Choose your path.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild size="lg" className="w-full transition-transform hover:scale-105">
            <Link href="/instructions/input-to-output">Input to Output</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full transition-transform hover:scale-105">
            <Link href="/instructions/output-to-input">Output to Input</Link>
          </Button>
        </CardContent>
      </Card>
      <div className="absolute bottom-4 text-center text-sm text-muted-foreground z-10">
          <Link href="/admin" className="hover:underline">Admin Panel</Link>
      </div>
    </main>
  );
}
