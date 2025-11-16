import { SectionCards } from '@/features/dashboard/components/section-cards';
import { checkAdminPermissions } from '@/lib/auth/checkPermissions';
import { requireAuth } from '@/lib/auth/requireAuth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const { user } = await requireAuth();

  const canManageUsers = await checkAdminPermissions(user.id);
  console.log('canManageUsers', canManageUsers);
  if (!canManageUsers.success) {
    redirect('/login');
  }

  return (
    <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
      <h1 className={'text-4xl'}>Admin Page</h1>
      <SectionCards />
    </div>
  );
}
