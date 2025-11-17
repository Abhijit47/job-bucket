// import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

import { auth } from '@/lib/auth/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return session;
});

export type TRPCContext = ReturnType<typeof createTRPCContext>;
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<TRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(
  t.middleware(async ({ ctx, next }) => {
    const session = await ctx;

    if (!session?.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource.',
      });
    }

    return next({ ctx: { ...ctx, auth: session } });
  })
);
export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const { user } = ctx.auth;
  const data = await auth.api.userHasPermission({
    body: {
      userId: user.id,
      role: 'admin', // server-only
      permissions: {
        jobCreate: ['create', 'delete'],
        user: ['get', 'list', 'list'],
      },
    },
  });

  if (data.error) {
    console.error('Admin permission check failed:', data.error);
    throw new TRPCError({
      code: 'FORBIDDEN',
      message:
        data.error || 'You do not have permission to access this resource.',
    });
  }

  return next({ ctx: { ...ctx, status: data.success } });
});

export const employerProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const { user } = ctx.auth;
    const data = await auth.api.userHasPermission({
      body: {
        userId: user.id,
        role: 'employer', // server-only
        permissions: {
          jobCreate: ['create', 'delete', 'update', 'publish'],
        },
      },
    });

    if (data.error) {
      console.error('Admin permission check failed:', data.error);
      throw new TRPCError({
        code: 'FORBIDDEN',
        message:
          data.error || 'You do not have permission to access this resource.',
      });
    }
    return next({ ctx });
  }
);

export const candidateProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const { user } = ctx.auth;
    const data = await auth.api.userHasPermission({
      body: {
        userId: user.id,
        role: 'candidate', // server-only
        permissions: {
          jobApply: ['apply', 'withdraw'],
        },
      },
    });

    if (data.error) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message:
          data.error || 'You do not have permission to access this resource.',
      });
    }
    return next({ ctx });
  }
);
