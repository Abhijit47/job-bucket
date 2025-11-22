import 'server-only';

import { Polar } from '@polar-sh/sdk';
import '../envConfig';

const isDev = process.env.NODE_ENV === 'development';

const accessToken = isDev
  ? process.env.POLAR_ACCESS_TOKEN_DEV
  : process.env.POLAR_ACCESS_TOKEN_PROD;

export const polarClient = new Polar({
  accessToken: accessToken,
  // Use 'sandbox' if you're using the Polar Sandbox environment
  // Remember that access tokens, products, etc. are completely separated between environments.
  // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
  server: isDev ? 'sandbox' : 'production',
});
