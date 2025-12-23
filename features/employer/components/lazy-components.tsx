'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

export const LazyEmployerProfileForm = dynamic(
  () =>
    import('./employer-profile-form').then((mod) => mod.EmployerProfileForm),
  {
    ssr: false,
    loading: () => (
      <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className={'h-3 w-3/12'} />
            </CardTitle>
            <CardDescription>
              <Skeleton className={'h-3 w-4/12'} />
            </CardDescription>
            <CardAction className={'flex items-center gap-2'}>
              <Skeleton className={'h-8 w-24'} />
              <Skeleton className={'size-8'} />
            </CardAction>
          </CardHeader>
          <Separator />
          <CardContent className={'space-y-4'}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                className={'grid grid-cols-1 md:grid-cols-2 gap-4'}
                key={idx}>
                <div className={'space-y-2'}>
                  <Skeleton className={'h-3 w-32'} />
                  <Skeleton className={'h-9 w-full'} />
                  <Skeleton className={'h-2 w-20'} />
                </div>
                <div className={'space-y-2'}>
                  <Skeleton className={'h-3 w-32'} />
                  <Skeleton className={'h-9 w-full'} />
                  <Skeleton className={'h-2 w-20'} />
                </div>
              </div>
            ))}
            <div className={'space-y-2'}>
              <Skeleton className={'h-3 w-32'} />
              <Skeleton className={'h-9 w-full'} />
              <Skeleton className={'h-2 w-20'} />
            </div>
            <div className={'space-y-2'}>
              <Skeleton className={'h-3 w-32'} />
              <Skeleton className={'h-32 w-full'} />
              <Skeleton className={'h-2 w-20'} />
            </div>
            <Separator />
          </CardContent>
          <CardFooter className={'space-x-4'}>
            <Skeleton className={'h-9 w-24'} />
            <Skeleton className={'h-9 w-24'} />
          </CardFooter>
        </Card>
      </div>
    ),
  }
);

export const LazyCompanyProfileForm = dynamic(
  () => import('./company-profile-form').then((mod) => mod.CompanyProfileForm),
  {
    ssr: false,
    loading: () => (
      <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className={'h-3 w-3/12'} />
            </CardTitle>
            <CardDescription>
              <Skeleton className={'h-3 w-4/12'} />
            </CardDescription>
            <CardAction className={'flex items-center gap-2'}>
              <Skeleton className={'h-8 w-24'} />
              <Skeleton className={'size-8'} />
            </CardAction>
          </CardHeader>
          <Separator />

          <CardContent className={'space-y-4'}>
            <div className={'space-y-2'}>
              <Skeleton className={'h-3 w-32'} />
              <Skeleton className={'h-9 w-full'} />
              <Skeleton className={'h-2 w-20'} />
            </div>
            <div className={'space-y-2'}>
              <Skeleton className={'h-3 w-32'} />
              <Skeleton className={'h-48 w-full'} />
              <Skeleton className={'h-2 w-20'} />
            </div>

            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                className={'grid grid-cols-1 md:grid-cols-2 gap-4'}
                key={idx}>
                <div className={'space-y-2'}>
                  <Skeleton className={'h-3 w-32'} />
                  <Skeleton className={'h-9 w-full'} />
                  <Skeleton className={'h-2 w-20'} />
                </div>
                <div className={'space-y-2'}>
                  <Skeleton className={'h-3 w-32'} />
                  <Skeleton className={'h-9 w-full'} />
                  <Skeleton className={'h-2 w-20'} />
                </div>
              </div>
            ))}
            <Separator />
          </CardContent>
          <CardFooter className={'space-x-4'}>
            <Skeleton className={'h-9 w-24'} />
            <Skeleton className={'h-9 w-24'} />
          </CardFooter>
        </Card>

        <Skeleton className={'h-2 w-full'} />
      </div>
    ),
  }
);
