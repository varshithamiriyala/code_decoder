import Link from 'next/link';
import { Logo } from './Logo';

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Back to homepage">
          <Logo size="sm" />
          <h1 className="text-2xl font-bold hidden sm:block">Code Duel</h1>
        </Link>
        <div className="flex-grow flex justify-end">
          {children}
        </div>
      </div>
    </header>
  );
}
