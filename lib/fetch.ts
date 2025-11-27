import { createFetch, createSchema } from '@better-fetch/fetch';
import z from 'zod';

export const zodSchema = createSchema({
  '/api/uploads/resume': {
    input: z.unknown(),
    output: z.object({
      // // fileUrl: z.url('Invalid file URL'), // later change to url
      fileUrl: z.string().min(1, 'File URL is required'),
      fileName: z.string().min(1, 'File name is required'),
      fileSize: z.string().min(1, 'File size is required'),
      fileType: z.string().min(1, 'File type is required'),
    }),
  },
});

export const $fetch = createFetch({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  schema: zodSchema,
});
