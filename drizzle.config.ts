import { defineConfig } from 'drizzle-kit';
import './envConfig';

export default defineConfig({
  schema: './drizzle/schemas.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
