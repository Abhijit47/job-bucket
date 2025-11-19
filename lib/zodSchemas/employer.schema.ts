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
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(256, 'Title should not exceed 256 characters.'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(4096, 'Description should not exceed 4096 characters.'),
  tags: z
    .array(z.string().min(1, 'Tag cannot be empty.'))
    .max(10, 'You can add up to 10 tags only.'),
  salaryRange: z
    .array(
      z
        .number()
        .min(0, 'Salary must be a non-negative number.')
        .max(1000000000, 'Salary exceeds the maximum limit.')
    )
    .length(2),
  salaryCurrency: z.enum(currencies, 'Please select a valid currency.'),
  salaryPeriod: z.enum(salaryPeriods, 'Please select a valid salary period.'),
  location: z
    .string()
    .min(1, 'Location is required.')
    .max(256, 'Location should not exceed 256 characters.'),
  jobType: z.enum(jobTypes, 'Please select a valid job type.'),
  workType: z.enum(workTypes, 'Please select a valid work type.'),
  jobLevel: z.enum(jobLevels, 'Please select a valid job level.'),
  experience: z
    .string()
    .min(1, 'Experience is required.')
    .max(100, 'Experience should not exceed 100 characters.'),
  qualifications: z.enum(
    qualifications,
    'Please select a valid qualification.'
  ),
  responsibilities: z.string().max(2048).optional(),
  isFeatured: z.boolean('Featured status is required.'),
  isActive: z.boolean('Active status is required.'),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type MyJobInput = z.infer<typeof myJobSchema>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
