import { withAdminAuth } from '@/lib/auth/withAdminAuth';

export default async function ManageCompaniesPage() {
  await withAdminAuth();
  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <h1 className={'text-4xl'}>ManageCompaniesPage</h1>
    </div>
  );
}
