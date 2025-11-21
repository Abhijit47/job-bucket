import { defineConfig } from 'drizzle-kit';
import './envConfig';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  schema: './drizzle/schemas.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  breakpoints: isDev ? true : false,
  verbose: isDev ? true : false,
});
