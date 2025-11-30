import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';

import ResumeItems from '@/features/candidate/components/resume-items';
import UploadResumeDialog from '@/features/candidate/components/upload-resume-dialog';
import { prefetchResumes } from '@/features/candidate/server/prefetch';
import { withCandidateAuth } from '@/lib/auth/withCandidateAuth';
import { HydrateClient } from '@/trpc/server';
import Script from 'next/script';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function MyResumesPage() {
  const { user } = await withCandidateAuth();

  prefetchResumes();

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<p>Something went wrong while loading the resumes.</p>}>
        <Suspense fallback={<p>Loading resumes...</p>}>
          <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
            <Item variant='outline'>
              <ItemContent>
                <ItemTitle>Add New Resume</ItemTitle>
                <ItemDescription>
                  Upload a new resume to your profile.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <UploadResumeDialog userId={user.id} />
              </ItemActions>
            </Item>

            <ResumeItems />

            <Script
              id='dommatrix-polyfill'
              src='/assets/js/dommatrix.js'
              strategy='worker'
            />
          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
