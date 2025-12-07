import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { EmployerProfileForm } from '@/features/employer/components/employer-profile-form';
import { prefetchEmployerProfile } from '@/features/employer/server/prefetch';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';
import { HydrateClient } from '@/trpc/server';

export default async function EmployerProfileUpdatePage() {
  await withEmployerAuth();

  prefetchEmployerProfile();

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={
          <p>
            Something went wrong while loading the employer profile update page.
          </p>
        }>
        <Suspense fallback={<p>Loading employer settings...</p>}>
          <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
            <EmployerProfileForm />
          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
