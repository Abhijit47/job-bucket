import { ChartAreaInteractive } from '@/features/dashboard/components/chart-area-interactive';
import { SectionCards } from '@/features/employer/components/section-cards';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';

export default async function EmployerPage() {
  await withEmployerAuth();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <SectionCards />

      <ChartAreaInteractive />
    </div>
  );
}
