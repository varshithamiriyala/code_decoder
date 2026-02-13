import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Logo({ size = 'md', className }: LogoProps) {
    const sizeClasses = {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
    };
    const iconSizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
    }

  return (
    <div className={cn('bg-primary text-primary-foreground rounded-md inline-block', sizeClasses[size], className)}>
      <Terminal className={cn(iconSizeClasses[size])} />
    </div>
  );
}
