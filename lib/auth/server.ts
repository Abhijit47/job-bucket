import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin as adminPlugin } from 'better-auth/plugins/admin';

import { db } from '@/drizzle/db';
import * as schemas from '@/drizzle/schemas';
import { username } from 'better-auth/plugins';
import { eq } from 'drizzle-orm';
import { decodeRoleObject } from '../utils';
import { ac, admin, candidate, employer } from './permissions';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    transaction: true,
    schema: schemas,
    debugLogs: false,
  }),

  databaseHooks: {
    user: {
      create: {
        after: async (oldData, context) => {
          const role = context?.query?.r
            ? decodeRoleObject(context.query.r as 'employer' | 'candidate')
            : null;
          await db.transaction(async (tx) => {
            try {
              if (role) {
                await tx
                  .update(schemas.user)
                  .set({ role: role.r })
                  .where(eq(schemas.user.id, oldData.id));

                if (role.r === 'employer') {
                  try {
                    await tx
                      .insert(schemas.employer)
                      .values({ userId: oldData.id });
                  } catch (error) {
                    tx.rollback();
                    throw error;
                  }
                }

                if (role.r === 'candidate') {
                  try {
                    await tx
                      .insert(schemas.applicant)
                      .values({ userId: oldData.id });
                  } catch (error) {
                    tx.rollback();
                    throw error;
                  }
                }
              }
            } catch {
              throw new Error('Failed to sign up user');
            }
          });
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
    username({
      minUsernameLength: 5,
      maxUsernameLength: 50,
      usernameValidator: (username) => {
        if (username === 'admin') {
          return false;
        }
        if (username === 'employer') {
          return false;
        }
        if (username === 'candidate') {
          return false;
        }
        return true;
      },
      displayUsernameValidator: (displayUsername) => {
        // Allow only alphanumeric characters, underscores, and hyphens
        return /^[a-zA-Z0-9_-]+$/.test(displayUsername);
      },
      usernameNormalization: (username) => {
        return username
          .toLowerCase()
          .replaceAll('0', 'o')
          .replaceAll('3', 'e')
          .replaceAll('4', 'a');
      },
      displayUsernameNormalization: (displayUsername) =>
        displayUsername.toLowerCase(),
    }),
    nextCookies(),
  ],

  user: {
    additionalFields: {
      username: {
        type: 'string',
        required: false,
        unique: true,
        fieldName: 'username',
        input: false,
      },
      role: {
        type: 'string',
        fieldName: 'role',
        input: false,
      },
      lang: {
        type: 'string',
        required: false,
        defaultValue: 'en',
        fieldName: 'lang',
        input: false,
      },
      emailVerifiedAt: {
        type: 'date',
        required: false,
        fieldName: 'email_verified_at',
        input: false,
      },
      phoneNumber: {
        type: 'string',
        required: false,
        fieldName: 'phone_number',
        input: false,
      },
      isActive: {
        type: 'boolean',
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
});
