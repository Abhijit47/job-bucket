import { ChartAreaInteractive } from '@/features/dashboard/components/chart-area-interactive';
import IncompleteProfileAlert from '@/features/dashboard/components/incomplete-profile-alert';
import { SectionCards } from '@/features/employer/components/section-cards';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';
import { caller } from '@/trpc/server';

export default async function EmployerPage() {
  await withEmployerAuth();

  const isCompleteProfile = await caller.employers.getProfieStatus();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      {!isCompleteProfile ? (
        <IncompleteProfileAlert pathname='/employer/settings' />
      ) : null}
      <SectionCards />

      <ChartAreaInteractive />
    </div>
  );
}
