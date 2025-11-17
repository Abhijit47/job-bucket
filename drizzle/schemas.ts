import { relations } from 'drizzle-orm';
import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import {
  applicationStatus,
  currencies,
  genders,
  jobLevels,
  jobTypes,
  maritialStatus,
  nationalities,
  qualifications,
  roles,
  salaryPeriods,
  workTypes,
} from './db-constants';

export const createdAt = timestamp('created_at', { mode: 'date' })
  .defaultNow()
  .notNull();
export const deletedAt = timestamp('deleted_at', { mode: 'date' });
export const updatedAt = timestamp('updated_at', { mode: 'date' })
  .defaultNow()
  .$onUpdate(() => new Date())
  .notNull();

export const roleEnum = pgEnum('role', roles);

export const user = pgTable('user', {
  id: text('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: varchar('image')
    .default('https://avatar.vercel.sh/rauchg.svg?text=UN')
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: roleEnum('role'),
  banned: boolean('banned').default(false),
  banReason: varchar('ban_reason'),
  banExpires: timestamp('ban_expires'),

  // Additional fields can be added here
  emailVerifiedAt: timestamp('email_verified_at', { mode: 'date' }),
  username: varchar('username').unique(),
  lang: varchar('lang').default('en'),
  phoneNumber: varchar('phone_number', { length: 20 }).unique(),
  isActive: boolean('is_active').default(false),
});

export const session = pgTable('session', {
  id: text('id').primaryKey().unique().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  token: varchar('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: varchar('ip_address'),
  userAgent: varchar('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  impersonatedBy: varchar('impersonated_by'),
});

export const account = pgTable('account', {
  id: text('id').primaryKey().unique().notNull(),
  accountId: varchar('account_id').notNull(),
  providerId: varchar('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: varchar('access_token'),
  refreshToken: varchar('refresh_token'),
  idToken: varchar('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: varchar('scope'),
  password: varchar('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey().unique().notNull(),
  identifier: varchar('identifier').notNull(),
  value: varchar('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const nationalityEnum = pgEnum('nationality_enum', nationalities);
export const genderEnum = pgEnum('gender_enum', genders);
export const maritialStatusEnum = pgEnum(
  'maritial_status_enum',
  maritialStatus
);
export const applicant = pgTable('applicant', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),

  biography: varchar('biography', { length: 1024 }),
  dateOfBirth: timestamp('date_of_birth', { mode: 'date' }),
  nationality: nationalityEnum('nationality'),
  maritialStatus: maritialStatusEnum('maritial_status'),
  gender: genderEnum('gender'),
  experience: varchar('experience', { length: 2048 }),
  eduction: varchar('eduction', { length: 2048 }),
  websiteUrl: varchar('website_url', { length: 512 }),
  location: varchar('location', { length: 256 }),

  createdAt,
  deletedAt,
  updatedAt,
});

export const employer = pgTable('employer', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),

  companyName: varchar('company_name', { length: 100 }),
  companyDescription: varchar('company_description', {
    length: 2048,
  }),
  companyLogoUrl: varchar('company_logo_url', { length: 512 }).default(
    'https://avatar.vercel.sh/rauchg.svg?text=UN'
  ),
  companyBannerUrl: varchar('company_banner_url', { length: 512 }).default(
    'https://placehold.co/1200x300/png?text=Company+Banner'
  ),
  organizationType: varchar('organization_type', { length: 100 }),
  teamSize: varchar('team_size', { length: 50 }),
  yearOfEstablishment: varchar('year_of_establishment', {
    length: 4,
  }),
  companyWebsite: varchar('company_website', { length: 100 }),
  location: varchar('location', { length: 100 }),

  createdAt,
  deletedAt,
  updatedAt,
});

export const resume = pgTable('resume', {
  id: uuid('id').primaryKey().defaultRandom().unique().notNull(),
  applicantId: text('applicant_id')
    .references(() => applicant.userId, { onDelete: 'cascade' })
    .notNull(),
  fileUrl: varchar('file_url', { length: 512 }).notNull(),
  fileSize: varchar('file_size', { length: 100 }).notNull(),
  fileType: varchar('file_type', { length: 100 }).notNull(),
  isPrimary: boolean('is_primary').default(false).notNull(),
  createdAt,
  deletedAt,
  updatedAt,
});

export interface SalaryJSONB {
  min: number;
  max: number;
  currency: typeof currencies;
  period: typeof salaryPeriods;
}
export const qualificationsEnum = pgEnum('qualifications', qualifications);
export const jobLevelEnum = pgEnum('job_level', jobLevels);
export const jobTypeEnum = pgEnum('job_type', jobTypes);
export const workTypeEnum = pgEnum('work_type', workTypes);
export const job = pgTable('job', {
  id: uuid('id').primaryKey().defaultRandom().unique().notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  description: varchar('description', { length: 4096 }).notNull(),
  tags: varchar('tags', { length: 512 }).notNull(),
  salary: jsonb('salary').$type<SalaryJSONB>().notNull(),
  location: varchar('location', { length: 256 }).notNull(),
  jobType: jobTypeEnum('job_type').notNull(), // enum
  workType: workTypeEnum('work_type').notNull(), // enum
  jobLevel: jobLevelEnum('job_level').notNull(), // enum
  experience: varchar('experience', { length: 100 }).notNull(),
  qualifications: qualificationsEnum('qualifications').notNull(), // enum
  responsibilities: varchar('responsibilities', { length: 2048 }),
  isFeatured: boolean('is_featured').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  employerId: text('employer_id')
    .references(() => employer.userId, { onDelete: 'cascade' })
    .notNull(),
  createdAt,
  deletedAt,
  updatedAt,
});

export const applicationStatusEnum = pgEnum('status', applicationStatus);
export const application = pgTable('application', {
  id: uuid('id').primaryKey().defaultRandom().unique().notNull(),
  jobId: uuid('job_id')
    .references(() => job.id, { onDelete: 'cascade' })
    .notNull(),
  applicantId: text('applicant_id')
    .references(() => applicant.userId, { onDelete: 'cascade' })
    .notNull(),
  coverLetter: varchar('cover_letter', { length: 2048 }).notNull(),
  status: applicationStatusEnum('status').notNull(),
  resumeId: uuid('resume_id')
    .references(() => resume.id, { onDelete: 'cascade' })
    .notNull(),
  isBookmarked: boolean('is_bookmarked').default(false).notNull(),
  appliedAt: timestamp('applied_at', { mode: 'date' }).defaultNow().notNull(),
  statusUpdatedAt: timestamp('status_updated_at', { mode: 'date' })
    .defaultNow()
    .notNull(),
  notes: varchar('notes', { length: 2048 }),
  createdAt,
  deletedAt,
  updatedAt,
});

export const savedJob = pgTable('saved_job', {
  id: uuid('id').primaryKey().defaultRandom().unique().notNull(),
  applicantId: text('applicant_id')
    .references(() => applicant.userId, { onDelete: 'cascade' })
    .notNull(),
  jobId: uuid('job_id')
    .references(() => job.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt,
  deletedAt,
  updatedAt,
});

export const savedCandidate = pgTable('saved_candidate', {
  id: uuid('id').primaryKey().defaultRandom().unique().notNull(),
  employerId: text('employer_id')
    .references(() => employer.userId, { onDelete: 'cascade' })
    .notNull(),
  applicantId: text('applicant_id')
    .references(() => applicant.userId, { onDelete: 'cascade' })
    .notNull(),
  createdAt,
  deletedAt,
  updatedAt,
});

// relations
export const usersRelations = relations(user, ({ one, many }) => ({
  // One user can have one applicant profile
  applicant: one(applicant, {
    fields: [user.id],
    references: [applicant.userId],
    relationName: 'applicant',
  }),

  // One user can have one employer profile
  employer: one(employer, {
    fields: [user.id],
    references: [employer.userId],
    relationName: 'employer',
  }),

  // One user can have many sessions, accounts, and verifications
  sessions: many(session, { relationName: 'user_sessions' }),
  accounts: many(account, { relationName: 'user_accounts' }),
  verifications: many(verification, { relationName: 'user_verifications' }),
}));

export const sessionsRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
    relationName: 'user',
  }),
}));

export const accountsRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
    relationName: 'user',
  }),
}));

export const verificationsRelations = relations(verification, ({ one }) => ({
  user: one(user, {
    fields: [verification.identifier],
    references: [user.email],
    relationName: 'user',
  }),
}));

export const applicantRelations = relations(applicant, ({ one }) => ({
  user: one(user, {
    fields: [applicant.userId],
    references: [user.id],
    relationName: 'user',
  }),
}));

export const employerRelations = relations(employer, ({ one }) => ({
  user: one(user, {
    fields: [employer.userId],
    references: [user.id],
    relationName: 'user',
  }),
}));

export const resumeRelations = relations(resume, ({ one }) => ({
  applicant: one(applicant, {
    fields: [resume.applicantId],
    references: [applicant.userId],
    relationName: 'applicant',
  }),
}));

export const jobRelations = relations(job, ({ one, many }) => ({
  employer: one(employer, {
    fields: [job.employerId],
    references: [employer.userId],
    relationName: 'employer',
  }),
  applications: many(application, { relationName: 'job' }),
}));

export const applicationRelations = relations(application, ({ one }) => ({
  job: one(job, {
    fields: [application.jobId],
    references: [job.id],
    relationName: 'job',
  }),
  applicant: one(applicant, {
    fields: [application.applicantId],
    references: [applicant.userId],
    relationName: 'applicant',
  }),
  resume: one(resume, {
    fields: [application.resumeId],
    references: [resume.id],
    relationName: 'resume',
  }),
}));

export const savedJobRelations = relations(savedJob, ({ one }) => ({
  applicant: one(applicant, {
    fields: [savedJob.applicantId],
    references: [applicant.userId],
    relationName: 'applicant',
  }),
  job: one(job, {
    fields: [savedJob.jobId],
    references: [job.id],
    relationName: 'job',
  }),
}));

export const savedCandidateRelations = relations(savedCandidate, ({ one }) => ({
  employer: one(employer, {
    fields: [savedCandidate.employerId],
    references: [employer.userId],
    relationName: 'employer',
  }),
  applicant: one(applicant, {
    fields: [savedCandidate.applicantId],
    references: [applicant.userId],
    relationName: 'applicant',
  }),
}));
