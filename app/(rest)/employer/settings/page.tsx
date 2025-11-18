import { Card, CardContent } from '@/components/ui/card';
import { EmployerProfileForm } from '@/features/employer/components/employer-profile-form';
import { prefetchEmployerProfile } from '@/features/employer/server/prefetch';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';
import { HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function EmployerSettingsPage() {
  await withEmployerAuth();

  prefetchEmployerProfile();

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={
          <p>Something went wrong while loading the employer settings page.</p>
        }>
        <Suspense fallback={<p>Loading employer settings...</p>}>
          <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
            <Card>
              <CardContent>
                <EmployerProfileForm />
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
