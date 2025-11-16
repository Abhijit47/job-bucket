'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from '@/lib/auth/client';
import {
  IconFileInvoice,
  IconLayout2,
  IconUserCircle,
  IconUserCog,
} from '@tabler/icons-react';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { Spinner } from '../ui/spinner';

export default function UserButton() {
  const [isLogOutTransition, startLogOutTransition] = useTransition();
  const router = useRouter();
  const { data, isPending, isRefetching } = useSession();

  const avatarFallback = 'https://avatar.vercel.sh/rauchg.svg?text=UN';

  const handleLogout = () => {
    startLogOutTransition(async () => {
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
    <>
      {isPending || isRefetching ? (
        <>
          <Skeleton className='h-8 w-20 rounded-md' />
          <Skeleton className='h-8 w-24 rounded-md' />
        </>
      ) : !data ? (
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={data.user.image || avatarFallback}
                  alt={data.user.name || 'User Avatar'}
                />
                <AvatarFallback>
                  {data.user.name
                    ? data.user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                    : 'UN'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end'>
              <DropdownMenuLabel
                className={'inline-flex items-center justify-between w-full'}>
                <span className={'text-sm font-medium capitalize'}>
                  {data.user.name}
                </span>
                <Badge variant={'outline'} className={'text-[10px] capitalize'}>
                  {data.user.role}
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link
                    href={
                      data.user.role === 'admin'
                        ? '/admin'
                        : data.user.role === 'employer'
                        ? '/employer'
                        : '/candidate'
                    }>
                    Dashboard
                    <DropdownMenuShortcut>
                      <IconLayout2 className={'size-4'} />
                    </DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={'#'}>
                    Profile
                    <DropdownMenuShortcut>
                      <IconUserCircle className={'size-4'} />
                    </DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={'#'}>
                    Billing
                    <DropdownMenuShortcut>
                      <IconFileInvoice className={'size-4'} />
                    </DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={'#'}>
                    Settings
                    <DropdownMenuShortcut>
                      <IconUserCog className={'size-4'} />
                    </DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant='destructive'
                disabled={isLogOutTransition}
                onClick={handleLogout}>
                {isLogOutTransition ? (
                  <span className={'inline-flex items-center gap-2'}>
                    Signing Out...
                    <DropdownMenuShortcut>
                      <Spinner />
                    </DropdownMenuShortcut>
                  </span>
                ) : (
                  <span className={'inline-flex items-center gap-2 w-full'}>
                    Sign out
                    <DropdownMenuShortcut>
                      <LogOutIcon className='h-4 w-4 stroke-destructive' />
                    </DropdownMenuShortcut>
                  </span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}
