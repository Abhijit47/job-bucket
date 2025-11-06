import { ClientGreeting } from '@/components/client-greeting';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      /** input */
      text: 'from Server Side',
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
        <p>Test TRPC</p>
        <ClientGreeting />
      </div>
    </HydrationBoundary>
  );
}
