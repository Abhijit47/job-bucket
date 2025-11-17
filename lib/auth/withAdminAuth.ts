import { redirect } from 'next/navigation';
import { checkAdminPermissions } from './checkPermissions';
import { requireAuth } from './requireAuth';

export async function withAdminAuth() {
  const { user } = await requireAuth();
  const permissions = await checkAdminPermissions(user.id);

  if (!permissions.success) {
    redirect('/unauthorized');
  }

  return { user, permissions };
}
