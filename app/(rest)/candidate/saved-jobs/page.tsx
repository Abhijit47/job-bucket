import { withCandidateAuth } from '@/lib/auth/withCandidateAuth';

export default async function CandidateSavedJobs() {
  await withCandidateAuth();
  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <h1 className={'text-4xl'}>CandidateSavedJobs</h1>
    </div>
  );
}
