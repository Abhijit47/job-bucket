import {
  currencies,
  experiences,
  industries,
  jobBenefits,
  jobLevels,
  jobTags,
  jobTypes,
  locales,
  organizationTypes,
  qualifications,
  salaryPeriods,
  teamSizes,
  vacancies,
  workTypes,
} from '@/drizzle/db-constants';
import z from 'zod';
import { locationSchema } from './common.schema';

export const jobTagValues = jobTags.map((tag) => tag.value) as ReadonlyArray<
  (typeof jobTags)[number]['value']
>;

export const applyOptions = [
  {
    value: 'on-job-bucket',
    title: 'On JobBucket',
    description:
      ' Let candidates apply directly on JobBucket platform & all applications will show on your dashboard.',
  },
  {
    value: 'external-platform',
    title: 'External Platform',
    description:
      ' Candidates apply jobs on your website, all applications on your own website.',
  },
  {
    value: 'on-your-email',
    title: 'On Your Email',
    description:
      ' Candidates apply jobs on your email, all applications on your own email.',
  },
] as const;

export type ApplyOption = (typeof applyOptions)[number]['value'];

export const updateEmployerProfileSchema = z.object({
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
  image: z.url('Profile image URL is required.'),
  locale: z.enum(locales, {
    error: 'Please select a valid language preference.',
  }),
  isActive: z.boolean({ error: 'Profile active status is required.' }),
});
export const updateCompanyProfileSchema = z.object({
  companyName: z.string().min(1, 'Company name is required.').max(256),
  companyDescription: z
    .string()
    .min(1, 'Company description is required.')
    .max(2048, 'Company description should not exceed 2048 characters.'),
  // companyLogo: z
  //   .array(z.custom<ExtendedFileWithPreview>())
  //   .min(1, 'Please select at least one file')
  //   .max(1, 'Please select up to 1 file')
  //   .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
  //     message: 'File size must be less than 10MB',
  //     path: ['companyLogo'],
  //   }),
  // companyBanner: z
  //   .array(z.custom<ExtendedFileWithPreview>())
  //   .min(1, 'Please select at least one file')
  //   .max(1, 'Please select up to 1 file')
  //   .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
  //     message: 'File size must be less than 10MB',
  //     path: ['companyBanner'],
  //   }),
  companyLogoUrl: z.url('Company logo URL is required.'),
  companyBannerUrl: z.url('Company banner URL is required.'),
  organizationType: z.enum(
    organizationTypes,
    'Please select a valid organization type.'
  ),
  industryType: z.enum(industries, 'Please select a valid industry type.'),
  teamSize: z.enum(teamSizes, 'Please select a valid team size.'),
  yearOfEstablishment: z.string().min(1, 'Year of establishment is required.'),
  companyWebsite: z.url('Company website is required.'),
  streetAddress: z.string().min(1, 'Street address is required.'),
  location: locationSchema,
});

export const myJobSchema = z.object({ id: z.string() });

export const salarySchema = z
  .object({
    min: z
      .number()
      .min(0, 'Minimum salary must be a non-negative number.')
      .max(1000000000, 'Minimum salary exceeds the maximum limit.'),
    max: z
      .number()
      .min(0, 'Maximum salary must be a non-negative number.')
      .max(1000000000, 'Maximum salary exceeds the maximum limit.'),
    currency: z.enum(currencies, 'Please select a valid currency.'),
    period: z.enum(salaryPeriods, 'Please select a valid salary period.'),
  })
  .refine((data) => data.min <= data.max, {
    message: 'Minimum salary must be less than or equal to maximum salary.',
    path: ['min'],
  });

export const createJobSchemaBase = z.object({
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(256, 'Title should not exceed 256 characters.'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(4096, 'Description should not exceed 4096 characters.'),
  tags: z
    .array(z.enum(jobTagValues, 'Please select a valid tag.'))
    .min(1, 'Please select at least one tag.')
    .max(10, 'You can add up to 10 tags only.'),
  salary: salarySchema,
  benefits: z
    .array(z.enum(jobBenefits, 'Please select a valid benefit.'))
    .min(1, 'Please select at least one benefit.')
    .max(20, 'You can add up to 20 benefits only.'),
  city: z
    .string()
    .min(1, 'City is required.')
    .max(50, 'City should not exceed 50 characters.'),
  country: z
    .string()
    .min(1, 'Country is required.')
    .max(50, 'Country should not exceed 50 characters.'),
  jobType: z.enum(jobTypes, 'Please select a valid job type.'),
  jobLevel: z.enum(jobLevels, 'Please select a valid job level.'),
  workType: z.enum(workTypes, 'Please select a valid work type.'),
  experience: z.enum(experiences, 'Please select a valid experience level.'),
  qualification: z.enum(qualifications, 'Please select a valid qualification.'),
  vacancy: z.enum(vacancies, 'Please select a valid number of vacancies.'),
  expiryDate: z.preprocess((val) => {
    if (val === undefined || val === null) return val;
    // If it's already a Date keep it, otherwise try to construct one
    return val instanceof Date ? val : new Date(val as string);
  }, z.date('Please provide a valid expiry date.')),
  // expiryDate: z.date('Please provide a valid expiry date.'),
  responsibilities: z
    .string()
    .max(2048, 'Responsibilities should not exceed 2048 characters.')
    .optional(),
  isFeatured: z.boolean('Featured status is required.'),
  isActive: z.boolean('Active status is required.'),
  applyOn: z.enum(
    applyOptions.map((option) => option.value),
    'Please select a valid application method.'
  ),
});

export const createJobSchema = createJobSchemaBase;

export const jobModelSchema = createJobSchemaBase.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const updateJobSchema = createJobSchemaBase.partial().extend({
  id: z.string().min(1, 'Job ID is required.'),
  expiryDate: z
    .preprocess((val) => {
      if (val === undefined || val === null) return undefined;
      return val instanceof Date ? val : new Date(val as string);
    }, z.date())
    .optional(),
});

export type MyJobInput = z.infer<typeof myJobSchema>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type JobModel = z.infer<typeof jobModelSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type SalaryValues = z.infer<typeof salarySchema>;
export type UpdateEmployerProfileInput = z.infer<
  typeof updateEmployerProfileSchema
>;
export type UpdateCompanyProfileInput = z.infer<
  typeof updateCompanyProfileSchema
>;
