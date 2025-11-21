import { Card, CardContent } from '@/components/ui/card';
import UpdateJobForm from '@/features/employer/components/update-job-form';
import { prefetchJob } from '@/features/employer/server/prefetch';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';
import { HydrateClient } from '@/trpc/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type PageProps = {
  params: Promise<{ jobId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function UpdateJobPage({ params }: PageProps) {
  await withEmployerAuth();

  const jobId = (await params).jobId;

  if (!jobId) {
    return notFound();
  }

  prefetchJob(jobId);

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={
          <p>Something went wrong while loading the update job page.</p>
        }>
        <Suspense fallback={<p>Loading update job...</p>}>
          <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
            <Card>
              <CardContent>
                <UpdateJobForm jobId={jobId} />
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
