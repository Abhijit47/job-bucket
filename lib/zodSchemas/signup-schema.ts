import { roleEnum } from '@/constants';
import z from 'zod';

export const signUpFormSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.email('Invalid email address'),
    role: z.enum(roleEnum, {
      error: 'Please select a role',
    }),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
