'use client';

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { signOut, useSession } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export function NavUser() {
  const [isLogOutPending, startLogOutTransition] = useTransition();
  const router = useRouter();
  const { data, isPending, isRefetching } = useSession();
  const { isMobile } = useSidebar();

  const avatarFallback = 'https://avatar.vercel.sh/rauchg.svg?text=UN';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isPending || isRefetching || !data ? (
              <SidebarMenuButton className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Skeleton className='h-8 w-8 rounded-lg animate-pulse' />
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <Skeleton className='h-4 w-32 rounded animate-pulse' />
                    <Skeleton className='mt-1 h-3 w-48 rounded animate-pulse' />
                  </div>
                </div>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                <Avatar className='h-8 w-8 rounded-lg grayscalee'>
                  <AvatarImage
                    src={data.user.image ?? avatarFallback}
                    alt={data.user.name}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {data.user.name
                      ? data.user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                      : 'UN'}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{data.user.name}</span>
                  <span className='text-muted-foreground truncate text-xs'>
                    {data.user.email}
                  </span>
                </div>
                <IconDotsVertical className='ml-auto size-4' />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}>
            {isPending || isRefetching || !data ? (
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Skeleton className='h-8 w-8 rounded-lg animate-pulse' />
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <Skeleton className='h-4 w-32 rounded animate-pulse' />
                    <Skeleton className='mt-1 h-3 w-48 rounded animate-pulse' />
                  </div>
                </div>
              </DropdownMenuLabel>
            ) : (
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage
                      src={data.user.image ?? avatarFallback}
                      alt={data.user.name}
                    />
                    <AvatarFallback className='rounded-lg'>
                      {data.user.name
                        ? data.user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                        : 'UN'}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight relative'>
                    <span className='truncate font-medium'>
                      {data.user.name}
                    </span>
                    <span className='text-muted-foreground truncate text-xs'>
                      {data.user.email}
                    </span>
                    <Badge
                      className={
                        'text-[10px] capitalize absolute top-0 right-0'
                      }>
                      {data.user.role}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={isLogOutPending}
              variant='destructive'
              onClick={() => {
                startLogOutTransition(async () => {
                  await signOut({
                    fetchOptions: {
                      onSuccess() {
                        toast.success('Logged out successfully');
                        router.push('/login');
                      },
                      onError() {
                        toast.error('Error logging out');
                      },
                    },
                  });
                });
              }}>
              {isLogOutPending ? (
                <span className='inline-flex items-center gap-2'>
                  <Spinner />
                  Logging out...
                </span>
              ) : (
                <span className='inline-flex items-center gap-2'>
                  <IconLogout className={'stroke-destructive'} />
                  Log out
                </span>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
