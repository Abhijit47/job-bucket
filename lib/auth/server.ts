import { db } from '@/drizzle/db';
import { user } from '@/drizzle/schemas';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin as adminPlugin } from 'better-auth/plugins/admin';
import { eq } from 'drizzle-orm';
import { decodeRoleObject } from '../utils';
import { ac, admin, candidate, employer } from './permissions';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),

  databaseHooks: {
    user: {
      create: {
        after: async (oldData, context) => {
          const value = context?.query as { r: string };
          const role = decodeRoleObject(value.r);
          if (role) {
            await db
              .update(user)
              .set({ role: role.r })
              .where(eq(user.id, oldData.id));
          }
          return;
        },
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    // updateAge: 15 * 60, // 15 minutes
    cookieCache: {
      enabled: false,
      // maxAge: 15 * 60, // 15 minutes
    },
  },
  plugins: [
    adminPlugin({
      defaultRole: 'candidate',
      adminRoles: ['admin', 'superadmin'],
      ac,
      roles: {
        admin,
        candidate,
        employer,
      },
    }),
    nextCookies(),
  ],
});
