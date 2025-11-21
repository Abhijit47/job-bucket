import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';

import { JobsTable } from '@/features/employer/components/jobs-table';
import { prefetchJobs } from '@/features/employer/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import data from '@/features/employer/components/initial-data.json' assert { type: 'json' };

export default async function MyJobsPage() {
  await withEmployerAuth();

  prefetchJobs();

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<p>Something went wrong while loading the jobs page.</p>}>
        <Suspense fallback={<p>Loading jobs...</p>}>
          <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
            <JobsTable initialData={data} />
          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
