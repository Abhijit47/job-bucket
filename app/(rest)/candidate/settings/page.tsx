import { Card, CardContent } from '@/components/ui/card';
import CandidateProfileForm from '@/features/candidate/components/candidate-profile-form';
import { withCandidateAuth } from '@/lib/auth/withCandidateAuth';

export default async function CandidateSettingsPage() {
  await withCandidateAuth();
  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <Card>
        <CardContent>
          <CandidateProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
