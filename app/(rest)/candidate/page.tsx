import { SectionCards } from '@/features/dashboard/components/section-cards';
import { checkCandidatePermissions } from '@/lib/auth/checkPermissions';
import { requireAuth } from '@/lib/auth/requireAuth';
import { redirect } from 'next/navigation';

export default async function CanditatePage() {
  const { user } = await requireAuth();

  const canApplyJob = await checkCandidatePermissions(user.id);
  console.log('canApplyJob', canApplyJob);

  if (!canApplyJob.success) {
    redirect('/login');
  }

  return (
    <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
      <h1 className={'text-4xl'}>Canditate Page</h1>
      <SectionCards />
    </div>
  );
}
