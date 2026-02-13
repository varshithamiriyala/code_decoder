import { Suspense } from 'react';
import { ResultsClient } from '@/components/ResultsClient';
import { Header } from '@/components/Header';

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
            <Suspense fallback={<div className="text-center">Calculating results...</div>}>
                <ResultsClient />
            </Suspense>
        </main>
    </div>
  );
}
