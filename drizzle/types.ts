import {
  account,
  applicant,
  application,
  employer,
  job,
  resume,
  savedCandidate,
  savedJob,
  session,
  user,
  verification,
} from './schemas';

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

export type InsertSession = typeof session.$inferInsert;
export type SelectSession = typeof session.$inferSelect;

export type InsertAccount = typeof account.$inferInsert;
export type SelectAccount = typeof account.$inferSelect;

export type InsertVerification = typeof verification.$inferInsert;
export type SelectVerification = typeof verification.$inferSelect;

export type InsertApplicant = typeof applicant.$inferInsert;
export type SelectApplicant = typeof applicant.$inferSelect;

export type InsertEmployer = typeof employer.$inferInsert;
export type SelectEmployer = typeof employer.$inferSelect;

export type InsertJob = typeof job.$inferInsert;
export type SelectJob = typeof job.$inferSelect;

export type InsertApplication = typeof application.$inferInsert;
export type SelectApplication = typeof application.$inferSelect;

export type InsertResume = typeof resume.$inferInsert;
export type SelectResume = typeof resume.$inferSelect;

export type InsertSavedJob = typeof savedJob.$inferInsert;
export type SelectSavedJob = typeof savedJob.$inferSelect;

export type InsertSavedCandidate = typeof savedCandidate.$inferInsert;
export type SelectSavedCandidate = typeof savedCandidate.$inferSelect;
