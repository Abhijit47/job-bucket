'use client';

import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { signOut, useSession } from '@/lib/auth/client';
import { cn } from '@/lib/utils';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { Spinner } from '../ui/spinner';
import ThemeToggler from './theme-toggler';

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: '/', label: 'Home', active: true },
  { href: '#', label: 'Features' },
  { href: '#', label: 'Pricing' },
  { href: '#', label: 'About' },
  { href: '/users', label: 'Users' },
  { href: '/job', label: 'Job' },
];

export default function Navbar() {
  const [isTransition, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const handleLogout = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Successfully signed out.');
            router.push('/');
          },

          onError: () => {
            toast.error('Error signing out. Please try again.');
          },
        },
      });
    });
  };

  return (
    <header className='border-b px-4 md:px-6'>
      <div className='flex h-16 justify-between gap-4'>
        {/* Left side */}
        <div className='flex gap-2'>
          <div className='flex items-center md:hidden'>
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className='group size-8' variant='ghost' size='icon'>
                  <svg
                    className='pointer-events-none'
                    width={16}
                    height={16}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M4 12L20 12'
                      className='origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315'
                    />
                    <path
                      d='M4 12H20'
                      className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45'
                    />
                    <path
                      d='M4 12H20'
                      className='origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135'
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align='start' className='w-36 p-1 md:hidden'>
                <NavigationMenu className='max-w-none *:w-full'>
                  <NavigationMenuList className='flex-col items-start gap-0 md:gap-2'>
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className='w-full'>
                        <NavigationMenuLink
                          href={link.href}
                          className='py-1.5'
                          active={link.active}>
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
          {/* Main nav */}
          <div className='flex items-center gap-6'>
            <Link href='/' className='text-primary hover:text-primary/90'>
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className='h-full *:h-full max-md:hidden'>
              <NavigationMenuList className='h-full gap-2'>
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className='h-full'>
                    <NavigationMenuLink
                      active={pathname === link.href}
                      className={cn(
                        pathname === link.href ? 'border-b-primary' : '',
                        'h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium text-muted-foreground hover:border-b-primary hover:bg-transparent hover:text-primary data-active:border-b-primary data-active:bg-transparent!'
                      )}
                      asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className='flex items-center gap-2'>
          <ThemeToggler />
          {session.isPending || session.isPending ? (
            <>
              <Skeleton className='h-8 w-20 rounded-md' />
              <Skeleton className='h-8 w-24 rounded-md' />
            </>
          ) : !session.data ? (
            <>
              <Button asChild variant='ghost' size='sm' className='text-sm'>
                <Link href='/login'>Sign In</Link>
              </Button>
              <Button asChild size='sm' className='text-sm'>
                <Link href='/signup'>Get Started</Link>
              </Button>
            </>
          ) : (
            <>
              <Badge variant={'secondary'} className={'capitalize'}>
                {session.data.user.role}
              </Badge>
              <Button
                className='text-sm'
                size='sm'
                variant={'destructive'}
                disabled={isTransition}
                onClick={handleLogout}>
                {isTransition ? (
                  <span className={'inline-flex items-center gap-2'}>
                    Signing Out...
                    <Spinner />
                  </span>
                ) : (
                  <span className={'inline-flex items-center gap-2'}>
                    Sign Out
                    <LogOutIcon className='h-4 w-4' />
                  </span>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
