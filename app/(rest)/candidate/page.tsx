import { SectionCards } from '@/features/candidate/components/section-cards';
import { ChartAreaInteractive } from '@/features/dashboard/components/chart-area-interactive';
import IncompleteProfileAlert from '@/features/dashboard/components/incomplete-profile-alert';
import { withCandidateAuth } from '@/lib/auth/withCandidateAuth';

export default async function CandidatePage() {
  await withCandidateAuth();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <IncompleteProfileAlert pathname='/candidate/settings' />
      <SectionCards />

      <ChartAreaInteractive />
    </div>
  );
}
