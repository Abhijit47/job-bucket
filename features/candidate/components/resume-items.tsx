'use client';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { IconFileTypePdf } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useCandidateResumes } from '../hooks/use-candidates';
import ResumePreview from './resume-preview';
import ResumePrimarySwitch from './resume-primary-switch';

export default function ResumeItems() {
  const { data: resumes } = useCandidateResumes();

  return (
    <>
      {resumes.map((resume, idx) => (
        <Item variant='outline' key={resume.id}>
          <ItemMedia variant='icon'>
            <IconFileTypePdf />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Resume {idx + 1}</ItemTitle>
            <ItemDescription>
              {resume.id}
              {/* Last edited on June 20, 2024 at 10:30 AM */}
              {format(resume.updatedAt, "MMMM dd, yyyy 'at' hh:mm a")}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ResumePrimarySwitch id={resume.id} isPrimary={resume.isPrimary} />
            <ResumePreview id={resume.id} />
          </ItemActions>
        </Item>
      ))}
    </>
  );
}
