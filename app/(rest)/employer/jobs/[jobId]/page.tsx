import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';

type PageProps = {
  params: Promise<{ jobId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function JobPage({ params }: PageProps) {
  await withEmployerAuth();
  const jobId = (await params).jobId;

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <h1 className={'text-4xl'}>JobPage {jobId}</h1>
    </div>
  );
}
