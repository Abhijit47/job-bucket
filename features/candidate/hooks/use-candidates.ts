import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Hook to upload a resume
 */
export function useUploadResume() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.candidates.uploadResume.mutationOptions({
      onSuccess: (data, variables) => {
        toast.success(`${variables.fileName} uploaded successfully.`);
        queryClient.invalidateQueries(
          trpc.candidates.getResumes.queryOptions()
        );
      },
      onError: (err) => {
        console.error({ err });
        toast.error('Failed to upload resume.', { description: err.message });
      },
    })
  );
}

/**
 * Hook to make a resume primary
 */
export function useMakeResumePrimaryMutation() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.candidates.makeResumePrimary.mutationOptions({
      onSuccess: (data) => {
        toast.success('Resume set as primary successfully.');
        queryClient.invalidateQueries(
          trpc.candidates.getResumes.queryOptions()
        );
      },
      onError: (err) => {
        console.error({ err });
        toast.error('Failed to set resume as primary.', {
          description: err.message,
        });
      },
    })
  );
}

/**
 * Hook to delete a resume
 */
export function useDeleteResume() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.candidates.deleteResume.mutationOptions({
      onSuccess: (data, variables) => {
        toast.success('Resume deleted successfully.');
        queryClient.invalidateQueries(
          trpc.candidates.getResumes.queryOptions()
        );
      },
      onError: (err) => {
        console.error({ err });
        toast.error('Failed to delete resume.', { description: err.message });
      },
    })
  );
}

/**
 * Hook to get candidate resumes
 */
export function useCandidateResumes() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.candidates.getResumes.queryOptions());
}

/**
 * Hook to get candidate resume
 *
 */
export function useCandidateResume(resumeId: string) {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.candidates.getResumeById.queryOptions(resumeId));
}
