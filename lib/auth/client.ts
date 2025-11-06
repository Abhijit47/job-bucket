import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { ac, admin, candidate, employer } from './permissions';

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        candidate,
        employer,
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = createAuthClient();
