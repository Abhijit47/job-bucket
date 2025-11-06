import { LoginForm } from '@/features/auth/components/login-form';
import { requireUnAuth } from '@/lib/auth/requireUnAuth';

export default async function Page() {
  await requireUnAuth();

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
}
