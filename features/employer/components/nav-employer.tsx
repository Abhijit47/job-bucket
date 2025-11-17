'use client';

import { IconCirclePlus, IconFilePlus } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { dashboardLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavEmployer() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center gap-2'>
            <SidebarMenuButton
              tooltip='Quick Create'
              className='bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear'>
              <IconCirclePlus />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size='icon'
              className='size-8 group-data-[collapsible=icon]:opacity-0'
              variant='outline'>
              <IconFilePlus />
              <span className='sr-only'>Create Job</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
          {dashboardLinks.employer.map((item) => {
            const isCurrentPath = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isCurrentPath}>
                  <Link href={item.url} prefetch={true}>
                    {item.icon && (
                      <item.icon
                        className={cn(
                          isCurrentPath
                            ? 'stroke-primary'
                            : 'stroke-muted-foreground'
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        isCurrentPath
                          ? 'stroke-primary'
                          : 'stroke-muted-foreground'
                      )}>
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
