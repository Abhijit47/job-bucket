import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Hook to get employer profile
 */
export function useGetEmployerProfile() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.employers.myProfile.queryOptions());
}

/**
 * Hook to update employer profile
 */
export function useUpdateEmployerProfile() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  // const router = useRouter();

  return useMutation(
    trpc.employers.updateProfile.mutationOptions({
      onSuccess: (data, variables) => {
        toast.success(`${variables.companyName} profile updated successfully.`);
        queryClient.invalidateQueries(trpc.employers.myProfile.queryOptions());
        // router.push('/employer/profile');
      },
      onError: () => {
        toast.error('Failed to update employer profile.');
      },
    })
  );
}

/**
 * Hook to create a job
 */
export function useCreateJob() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.employers.createJob.mutationOptions({
      onSuccess: (data, variables) => {
        toast.success(`Job ${variables.title} created successfully.`);
        queryClient.invalidateQueries(trpc.employers.getJobs.queryOptions());
      },
      onError: (err) => {
        console.error({ err });
        toast.error('Failed to create job.', { description: err.message });
      },
    })
  );
}

/**
 * Hook to get employer's jobs
 */
export function useGetMyJobs() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.employers.getJobs.queryOptions());
}

/**
 * Hook to get a single job by ID
 */
export function useGetMyJob(jobId: string) {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.employers.getJob.queryOptions({ id: jobId }));
}

/**
 * Hook to check if employer profile is complete
 */
export function useIsEmployerProfileComplete() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.employers.getProfileStatus.queryOptions());
}
