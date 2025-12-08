import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

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
        // console.error({ err });
        toast.error('Failed to create job.', { description: err.message });
      },
    })
  );
}

/**
 * Hook to update a job
 */
export function useUpdateJob() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.employers.updateJob.mutationOptions({
      onSuccess: (data, variables) => {
        toast.success(`${variables.title} job updated successfully.`);
        queryClient.invalidateQueries(trpc.employers.getJobs.queryOptions());
        queryClient.invalidateQueries(
          trpc.employers.getJob.queryOptions({ id: variables.id })
        );
      },
      onError: (err) => {
        // console.error({ err });
        toast.error('Failed to update job.', { description: err.message });
      },
    })
  );
}

/**
 * Hook to delete a job
 */
export function useDeleteJob() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.employers.removeJob.mutationOptions({
      onSuccess: () => {
        toast.success(`Job deleted successfully.`);
        queryClient.invalidateQueries(trpc.employers.getJobs.queryOptions());
      },
      onError: (err) => {
        // console.error({ err });
        toast.error('Failed to delete job.', { description: err.message });
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
 * Hook to get employer profile
 */
export function useGetEmployerProfile() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.employers.getEmployerProfile.queryOptions());
}

/**
 * Hook to get company profile
 */
export function useGetCompanyProfile() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.employers.getCompanyProfile.queryOptions());
}

/**
 * Hook to check if employer profile is complete
 */
export function useIsEmployerProfileComplete() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.employers.getProfileStatus.queryOptions());
}

/**
 * Hook to update employer profile
 */
export function useUpdateEmployerProfile() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  // const router = useRouter();

  return useMutation(
    trpc.employers.updateEmployerProfile.mutationOptions({
      onSuccess: (data, variables) => {
        toast.success(`${variables.name} profile updated successfully.`);
        queryClient.invalidateQueries(
          trpc.employers.getEmployerProfile.queryOptions()
        );
        queryClient.invalidateQueries(
          trpc.employers.getProfileStatus.queryOptions()
        );
      },
      onError: (err) => {
        toast.error('Failed to update employer profile.', {
          description: err.message,
        });
      },
    })
  );
}

/**
 * Hook to update company profile
 */
export function useUpdateCompanyProfile() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  // const router = useRouter();

  return useMutation(
    trpc.employers.updateCompanyProfile.mutationOptions({
      onSuccess: (data, variables) => {
        toast.success(
          `${variables.companyName} company profile updated successfully.`
        );
        queryClient.invalidateQueries(
          trpc.employers.getCompanyProfile.queryOptions()
        );
        queryClient.invalidateQueries(
          trpc.employers.getProfileStatus.queryOptions()
        );
      },
      onError: (err) => {
        toast.error('Failed to update company profile.', {
          description: err.message,
        });
      },
    })
  );
}
