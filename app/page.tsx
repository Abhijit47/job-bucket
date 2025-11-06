import { ClientGreeting } from '@/components/client-greeting';
import { caller, getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      /** input */
      text: 'from Server Side',
    })
  );

  const greeting = await caller.hello({ text: 'from Server Side' });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
        <p>Test TRPC</p>
        <ErrorBoundary fallback={<div>Something went wrong page.</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientGreeting />

            <div>
              <p className='mt-6 text-2xl'>
                Server Greeting: {greeting.greeting}
              </p>
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrationBoundary>
  );
}
