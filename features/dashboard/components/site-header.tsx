'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment } from 'react';

import ThemeToggler from '@/components/shared/theme-toggler';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function SiteHeader() {
  const segments = useSelectedLayoutSegments();

  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        {/* <h1 className='text-xs font-medium capitalize'>
          {segments.length === 0
            ? segments
            : segments.join(' / ').replace(/-/g, ' ')}
        </h1> */}

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={'/'}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {segments.map((segment, index) => {
              const isLast = index === segments.length - 1;
              // console.log('segment', segment, isLast);

              // add every iteration /employer, /employer/jobs, /employer/jobs/123, /employer/jobs/123/update

              // const preparedSegment = segments
              //   .slice(0, index + 1)
              //   .join('/')
              //   .replace(/-/g, ' ');
              // console.log('preparedSegment', preparedSegment);

              return (
                <Fragment key={segment}>
                  <BreadcrumbSeparator />
                  {isLast ? (
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {segment.replace(/-/g, ' ')}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link
                          prefetch
                          href={
                            ('/' +
                              segments.slice(0, index + 1).join('/')) as Route
                          }>
                          {segment.replace(/-/g, ' ')}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  )}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className='ml-auto flex items-center gap-2'>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
