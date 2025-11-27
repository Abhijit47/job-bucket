import { prefetch, trpc } from '@/trpc/server';
import type { inferInput } from '@trpc/tanstack-react-query';

type ResumesInput = inferInput<typeof trpc.candidates.getResumes>;
// type ResumesInput = inferInput<typeof trpc.candidates.get>;

/**
 * Prefetch all resumes
 *
 */
export function prefetchResumes(params: ResumesInput) {
  return prefetch(trpc.candidates.getResumes.queryOptions(params));
}

/**
 * Prefetch a single resume by ID
 *
 */
export function prefetchResume(resumeId: string) {
  return prefetch(trpc.candidates.getResumeById.queryOptions(resumeId));
}

/**
 * Prefetch candidate profile
 *
 */
// export function prefetchCandidateProfile() {
//   return prefetch(trpc.candidates.myProfile.queryOptions());
// }
