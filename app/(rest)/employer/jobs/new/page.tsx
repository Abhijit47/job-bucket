import { checkEmployerPermissions } from '@/lib/auth/checkPermissions';
import { requireAuth } from '@/lib/auth/requireAuth';
import { redirect } from 'next/navigation';

export default async function CreateJob() {
  const { user } = await requireAuth();

  const canCreateJob = await checkEmployerPermissions(user.id);

  if (!canCreateJob.success) {
    redirect('/login');
  }
  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <h1 className={'text-4xl'}>CreateJob</h1>
    </div>
  );
}
