'use server';

import { redirect } from 'next/navigation';
import { checkEmployerPermissions } from './checkPermissions';
import { requireAuth } from './requireAuth';

export async function withEmployerAuth() {
  const { user } = await requireAuth();
  const permissions = await checkEmployerPermissions(user.id);

  if (!permissions.success) {
    redirect('/unauthorized');
  }

  return { user, permissions };
}
