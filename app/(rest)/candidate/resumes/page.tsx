import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { IconFileTypePdf } from '@tabler/icons-react';

import ResumePreview from '@/features/candidate/components/resume-preview';
import ResumePrimarySwitch from '@/features/candidate/components/resume-primary-switch';
import UploadResumeDialog from '@/features/candidate/components/upload-resume-dialog';
import { withCandidateAuth } from '@/lib/auth/withCandidateAuth';

export default async function MyResumesPage() {
  const { user } = await withCandidateAuth();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <Item variant='outline'>
        <ItemContent>
          <ItemTitle>Add New Resume</ItemTitle>
          <ItemDescription>
            Upload a new resume to your profile.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <UploadResumeDialog userId={user.id} />
        </ItemActions>
      </Item>

      {Array.from({ length: 12 }).map((_, idx) => (
        <Item variant='outline' key={crypto.randomUUID()}>
          <ItemMedia variant='icon'>
            <IconFileTypePdf />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Resume {idx + 1}</ItemTitle>
            <ItemDescription>
              Last edited on June 20, 2024 at 10:30 AM
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ResumePrimarySwitch id={crypto.randomUUID()} />
            <ResumePreview id={crypto.randomUUID()} />
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
