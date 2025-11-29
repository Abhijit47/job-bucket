import {
  experiences,
  genders,
  locales,
  maritalStatus,
  nationalities,
  qualifications,
} from '@/drizzle/db-constants';
import z from 'zod';
import { languageSchema, locationSchema } from './common.schema';

export const allowedFileTypes = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

export const candidateProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be at most 100 characters long'),
  email: z.email('Invalid email address'),
  image: z.url('Invalid image URL'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .transform((val) => val.toLowerCase()),
  language: languageSchema,
  locale: z.enum(locales, 'Invalid locale'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits long')
    .max(15, 'Phone number must be at most 15 digits long')
    .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format'),
  biography: z
    .string()
    .min(10, 'Biography must be at least 10 characters long')
    .max(1000, 'Biography must be at most 1000 characters long'),
  dateOfBirth: z.date('Invalid date format').refine((date) => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 18;
  }),
  nationality: z.enum(nationalities, 'Invalid nationality'),
  maritalStatus: z.enum(maritalStatus, 'Invalid marital status'),
  gender: z.enum(genders, 'Invalid gender'),
  experience: z.enum(experiences, 'Invalid experience level'),
  qualification: z.enum(qualifications, 'Invalid qualification'),
  websiteUrl: z.url('Invalid URL').optional(),
  location: locationSchema,
});

export const resumeFormSchema = z.object({
  applicantId: z.string().min(1, 'User ID is required'),
  fileUrl: z.string().optional(),
  fileName: z.string().optional(),
  fileSize: z.string().optional(),
  fileType: z.string().optional(),
  resumeFile: z
    .instanceof(File, { message: 'Resume file is required' })
    .superRefine((file, ctx) => {
      if (!file) {
        ctx.addIssue({
          code: 'custom',
          message: 'Resume file is required',
        });
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        ctx.addIssue({
          code: 'custom',
          message: 'File size must be less than 5MB',
        });
      }

      if (!allowedFileTypes.includes(file.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Only PDF and Word documents are allowed',
        });
      }
    }),
  isPrimary: z.boolean('Select if this is your primary resume'),
});

export const resumeId = z.string().min(1, 'Resume ID is required');

export type CandidateProfileFormValues = z.infer<
  typeof candidateProfileFormSchema
>;

export type ResumeFormValues = z.infer<typeof resumeFormSchema>;
export type ResumeId = z.infer<typeof resumeId>;
