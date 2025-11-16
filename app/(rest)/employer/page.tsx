import { SectionCards } from '@/features/dashboard/components/section-cards';
import { checkEmployerPermissions } from '@/lib/auth/checkPermissions';
import { requireAuth } from '@/lib/auth/requireAuth';
import { redirect } from 'next/navigation';

export default async function EmployerPage() {
  const { user } = await requireAuth();

  const canCreateJob = await checkEmployerPermissions(user.id);
  console.log('canCreateJob', canCreateJob);

  if (!canCreateJob.success) {
    redirect('/login');
  }

  return (
    <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
      <h1 className={'text-4xl'}>Employer Page</h1>
      <SectionCards />
    </div>
  );
}
