import {
  adminClient,
  inferAdditionalFields,
  usernameClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { ac, admin, candidate, employer } from './permissions';
import { Session } from './types';

// Option 1: Create a single authClient instance and export its methods
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
  plugins: [
    inferAdditionalFields<Session>(),
    adminClient({
      ac,
      roles: {
        admin,
        candidate,
        employer,
      },
    }),
    usernameClient(),
  ],
});

// Option 2: Export commonly used auth methods for easier imports
export const { signIn, signUp, signOut, useSession } = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
  plugins: [
    inferAdditionalFields<Session>(),
    adminClient({
      ac,
      roles: {
        admin,
        candidate,
        employer,
      },
    }),
    usernameClient(),
  ],
});
