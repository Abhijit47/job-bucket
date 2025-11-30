'use client';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { IconFileTypeDocx, IconFileTypePdf } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useCandidateResumes } from '../hooks/use-candidates';
import { LazyResumePreview } from './resume-preview';

export default function ResumeItems() {
  const { data: resumes } = useCandidateResumes();

  return (
    <>
      {resumes.map((resume, idx) => (
        <Item variant='outline' key={resume.id}>
          <ItemMedia variant='icon'>
            {resume.fileType === 'application/pdf' ? (
              <IconFileTypePdf />
            ) : (
              <IconFileTypeDocx />
            )}
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
            <LazyResumePreview
              id={resume.id}
              fileSize={resume.fileSize}
              fileType={resume.fileType}
              fileUrl={resume.fileUrl}
            />
          </ItemActions>
        </Item>
      ))}
    </>
  );
}
