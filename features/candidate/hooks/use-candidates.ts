import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
