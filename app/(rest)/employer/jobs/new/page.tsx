import { Card, CardContent } from '@/components/ui/card';
import CreateJobForm from '@/features/employer/components/create-job-form';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';
import { HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function CreateJob() {
  await withEmployerAuth();

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={
          <p>Something went wrong while loading the create job page.</p>
        }>
        <Suspense fallback={<p>Loading create job...</p>}>
          <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
            <Card>
              <CardContent>
                <CreateJobForm />
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
