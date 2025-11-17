import { redirect } from 'next/navigation';
import { checkCandidatePermissions } from './checkPermissions';
import { requireAuth } from './requireAuth';

export async function withCandidateAuth() {
  const { user } = await requireAuth();
  const permissions = await checkCandidatePermissions(user.id);

  if (!permissions.success) {
    redirect('/unauthorized');
  }

  return { user, permissions };
}
