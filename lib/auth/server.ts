import { db } from '@/drizzle/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),

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
  plugins: [nextCookies()],
});
