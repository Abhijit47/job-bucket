import { checkEmployerPermissions } from '@/lib/auth/checkPermissions';
import { requireAuth } from '@/lib/auth/requireAuth';
import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{ jobId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function UpdateJobPage({ params }: PageProps) {
  const { user } = await requireAuth();

  const canCreateJob = await checkEmployerPermissions(user.id);

  if (!canCreateJob.success) {
    redirect('/login');
  }

  const jobId = (await params).jobId;

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <h1 className={'text-4xl'}>UpdateJobPage {jobId}</h1>
    </div>
  );
}
