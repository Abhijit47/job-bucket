import {
  currencies,
  jobLevels,
  jobTypes,
  qualifications,
  salaryPeriods,
  workTypes,
} from '@/drizzle/db-constants';
import z from 'zod';

export const organizationTypes = [
  'Public Company',
  'Private Company',
  'Non-Profit',
  'Government Agency',
  'Partnership',
  'Sole Proprietorship',
] as const;

export const locales = [
  'en-US',
  'es-ES',
  'fr-FR',
  'de-DE',
  'zh-CN',
  'ja-JP',
  'ru-RU',
  'ar-SA',
  'pt-BR',
  'hi-IN',
] as const;

export type organizationUnion = (typeof organizationTypes)[number];
export type localeUnion = (typeof locales)[number];

export const updateProfileSchema = z.object({
  companyName: z.string().min(1, 'Company name is required.').max(256),
  companyDescription: z
    .string()
    .min(1, 'Company description is required.')
    .max(2048, 'Company description should not exceed 2048 characters.'),
  companyLogoUrl: z.url(),
  companyBannerUrl: z.url(),
  organizationType: z.enum(organizationTypes),
  teamSize: z.string().min(1, 'Team size is required.'),
  yearOfEstablishment: z.string().min(1, 'Year of establishment is required.'),
  companyWebsite: z.url(),
  location: z.string().min(1, 'Location is required.').max(256),

  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name should not exceed 100 characters.'),
  username: z
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(50, 'Username should not exceed 50 characters.'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number should not exceed 20 characters.'),
  image: z.url(),
  lang: z.enum(locales, {
    error: 'Please select a valid language preference.',
  }),
  isActive: z.boolean({ error: 'Profile active status is required.' }),
});

export const myJobSchema = z.object({ id: z.string() });

export const createJobSchema = z.object({
  title: z.string().max(256),
  description: z.string().max(4096),
  tags: z.array(z.string().max(50)).max(10),
  salary: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.enum(currencies),
    period: z.enum(salaryPeriods),
  }),
  location: z.string().max(256),
  jobType: z.enum(jobTypes),
  workType: z.enum(workTypes),
  jobLevel: z.enum(jobLevels),
  experience: z.string().max(100),
  qualifications: z.enum(qualifications),
  responsibilities: z.string().max(2048).optional(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type MyJobInput = z.infer<typeof myJobSchema>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
