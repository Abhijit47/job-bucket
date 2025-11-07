import { caller } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function UsersPage() {
  const data = await caller.users({});
  return (
    <ErrorBoundary fallback={<div>Something went wrong page.</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>{JSON.stringify(data.users, null, 2)}</div>
      </Suspense>
    </ErrorBoundary>
  );
}
