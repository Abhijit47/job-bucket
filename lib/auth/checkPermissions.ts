'use server';

import { auth } from '@/lib/auth/server';
import { cache } from 'react';

export const checkAdminPermissions = cache(async (userId: string) => {
  const result = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permissions: {
        user: [
          'create',
          'list',
          'set-role',
          'ban',
          'impersonate',
          'delete',
          'set-password',
          'get',
          'update',
        ],
      },
    },
  });
  return result;
});

export const checkEmployerPermissions = cache(async (userId: string) => {
  const result = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permissions: {
        jobCreate: ['create', 'share', 'update', 'publish'],
      },
    },
  });
  return result;
});

export const checkCandidatePermissions = cache(async (userId: string) => {
  const result = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permissions: {
        jobApply: ['apply', 'withdraw'],
      },
    },
  });
  return result;
});
