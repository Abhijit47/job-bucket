import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';

export default async function EmployerSettingsPage() {
  await withEmployerAuth();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <h1 className={'text-4xl'}>EmployerSettingsPage</h1>
    </div>
  );
}
