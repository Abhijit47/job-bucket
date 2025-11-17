import { SectionCards } from '@/features/candidate/components/section-cards';
import { ChartAreaInteractive } from '@/features/dashboard/components/chart-area-interactive';
import { withCandidateAuth } from '@/lib/auth/withCandidateAuth';

export default async function CandidatePage() {
  await withCandidateAuth();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <SectionCards />

      <ChartAreaInteractive />
    </div>
  );
}
