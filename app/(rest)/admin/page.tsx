import { SectionCards } from '@/features/admin/components/section-cards';
import { ChartAreaInteractive } from '@/features/dashboard/components/chart-area-interactive';
import { withAdminAuth } from '@/lib/auth/withAdminAuth';

export default async function AdminPage() {
  await withAdminAuth();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <SectionCards />

      <ChartAreaInteractive />
    </div>
  );
}
