import { SectionCards } from '@/features/admin/components/section-cards';
import { ChartAreaInteractive } from '@/features/dashboard/components/chart-area-interactive';
import IncompleteProfileAlert from '@/features/dashboard/components/incomplete-profile-alert';
import { withAdminAuth } from '@/lib/auth/withAdminAuth';

export default async function AdminPage() {
  const { user } = await withAdminAuth();

  const isCompleteProfile = Boolean(
    user.emailVerified &&
      user.emailVerifiedAt &&
      user.username &&
      user.phoneNumber
  );

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      {!isCompleteProfile ? (
        <IncompleteProfileAlert pathname='/admin/settings' />
      ) : null}
      <SectionCards />

      <ChartAreaInteractive />
    </div>
  );
}
