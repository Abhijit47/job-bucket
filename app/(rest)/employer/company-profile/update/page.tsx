import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { LazyCompanyProfileForm } from '@/features/employer/components/company-profile-form';
import { prefetchCompanyProfile } from '@/features/employer/server/prefetch';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';
import { HydrateClient } from '@/trpc/server';

export default async function UpdateCompanyProfilePage() {
  await withEmployerAuth();

  prefetchCompanyProfile();

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={
          <p>
            Something went wrong while loading the company profile update page.
          </p>
        }>
        <Suspense fallback={<p>Loading company settings...</p>}>
          <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
            <LazyCompanyProfileForm />
          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
