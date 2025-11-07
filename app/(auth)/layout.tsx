import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={'h-dvh flex items-center justify-center relative'}>
      <Link
        href={'/'}
        className={cn(
          buttonVariants({
            variant: 'secondary',
            size: 'sm',
          }),
          'absolute top-4 left-4 md:top-8 md:left-8'
        )}>
        Go Back
      </Link>
      {children}
    </main>
  );
}
