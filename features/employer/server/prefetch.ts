import { prefetch, trpc } from '@/trpc/server';
import type { inferInput } from '@trpc/tanstack-react-query';

type Input = inferInput<typeof trpc.employers.getJobs>;

/**
 * Prefetch all jobs
 *
 */
export function prefetchJobs(params: Input) {
  return prefetch(trpc.employers.getJobs.queryOptions(params));
}

/**
 * Prefetch a single job by ID
 */
export function prefetchJob(jobId: string) {
  return prefetch(trpc.employers.getJob.queryOptions({ id: jobId }));
}

/**
 * Prefetch employer profile
 */
export function prefetchEmployerProfile() {
  return prefetch(trpc.employers.myProfile.queryOptions());
}
