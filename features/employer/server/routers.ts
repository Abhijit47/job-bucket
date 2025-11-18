import { db } from '@/drizzle/db';
import {
  employer as employerTable,
  job as jobTable,
  user as userTable,
} from '@/drizzle/schemas';
import {
  createJobSchema,
  myJobSchema,
  updateProfileSchema,
} from '@/lib/zodSchemas/employer.schema';
import { createTRPCRouter, employerProcedure } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';

export const employersRouter = createTRPCRouter({
  getProfileStatus: employerProcedure.query(async ({ ctx }) => {
    const { user: employerAuth } = ctx.auth;

    // join user table to employer table to verify user ownership
    const prepareInnerJoinStatement = db
      .select()
      .from(employerTable)
      .innerJoin(userTable, eq(employerTable.userId, userTable.id))
      .where((table) =>
        and(
          eq(table.user.id, employerAuth.id),
          eq(table.employer.userId, employerAuth.id)
        )
      )
      .prepare('get-employer-profile');

    // execute the query
    const result = await prepareInnerJoinStatement.execute();

    if (!result.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Employer profile not found.',
      });
    }

    const [{ employer, user }] = result;

    const isCompleteProfile = Boolean(
      employer.companyName &&
        employer.companyDescription &&
        employer.organizationType &&
        employer.teamSize &&
        employer.yearOfEstablishment &&
        employer.companyWebsite &&
        employer.location &&
        // user.emailVerifiedAt &&
        user.username &&
        user.phoneNumber
    );

    return isCompleteProfile;
  }),

  createJob: employerProcedure
    .input(createJobSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.auth;

      const [newJob] = await db
        .insert(jobTable)
        .values({
          title: input.title,
          description: input.description,
          tags: JSON.stringify(input.tags),
          salary: { ...input.salary },
          location: input.location,
          jobType: input.jobType,
          workType: input.workType,
          jobLevel: input.jobLevel,
          experience: input.experience,
          qualifications: input.qualifications,
          responsibilities: input.responsibilities,
          isFeatured: input.isFeatured,
          isActive: input.isActive,
          employerId: user.id,
        })
        .returning({ id: jobTable.id });

      if (!newJob) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create job posting.',
        });
      }
      return newJob.id;
    }),

  updateJob: employerProcedure
    .input(createJobSchema.extend({ jobId: myJobSchema.shape.id }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.auth;
      const { jobId } = input;
      const [updatedJob] = await db
        .update(jobTable)
        .set({
          title: input.title,
          description: input.description,
          tags: JSON.stringify(input.tags),
          salary: { ...input.salary },
          location: input.location,
          jobType: input.jobType,
          workType: input.workType,
          jobLevel: input.jobLevel,
          experience: input.experience,
          qualifications: input.qualifications,
          responsibilities: input.responsibilities,
          isFeatured: input.isFeatured,
          isActive: input.isActive,
          employerId: user.id,
        })
        .where(and(eq(jobTable.id, jobId), eq(jobTable.employerId, user.id)))
        .returning({ id: jobTable.id, title: jobTable.title });

      if (!updatedJob) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Job not found for this employer.',
        });
      }

      return updatedJob.title;
    }),

  removeJob: employerProcedure
    .input(myJobSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.auth;

      const [deleteJob] = await db
        .delete(jobTable)
        .where(and(eq(jobTable.id, input.id), eq(jobTable.employerId, user.id)))
        .returning({ id: jobTable.id, title: jobTable.title });

      if (!deleteJob) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to delete job posting.',
        });
      }

      return deleteJob.title;
    }),

  publishJob: employerProcedure
    .input(myJobSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.auth;

      const [publishedJob] = await db
        .update(jobTable)
        .set({ isActive: true })
        .where(and(eq(jobTable.id, input.id), eq(jobTable.employerId, user.id)))
        .returning({ id: jobTable.id, title: jobTable.title });

      if (!publishedJob) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to publish job posting.',
        });
      }

      return publishedJob.title;
    }),

  getJobs: employerProcedure.query(async ({ ctx }) => {
    const { user } = ctx.auth;

    const jobs = await db.query.job.findMany({
      where(table, { eq }) {
        return eq(table.employerId, user.id);
      },
      orderBy(fields, operators) {
        const { desc } = operators;
        return [desc(fields.createdAt)];
      },
      offset: 0,
      limit: 10,
    });

    return jobs;
  }),

  getJob: employerProcedure.input(myJobSchema).query(async ({ ctx, input }) => {
    const { user } = ctx.auth;

    const jobDetails = await db.query.job.findFirst({
      where(table, { eq, and }) {
        return and(eq(table.id, input.id), eq(table.employerId, user.id));
      },
    });

    if (!jobDetails) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Job not found for this employer.',
      });
    }

    return jobDetails;
  }),

  savedCandidates: employerProcedure.query(async ({}) => {
    // Placeholder implementation
    // In a real scenario, you would query the database for saved candidates
    // associated with the employer's user ID.

    return [];
  }),

  myProfile: employerProcedure.query(async ({ ctx }) => {
    const { user: employerAuth } = ctx.auth;

    // join user table to employer table to verify user ownership
    const prepareInnerJoinStatement = db
      .select()
      .from(employerTable)
      .innerJoin(userTable, eq(employerTable.userId, userTable.id))
      .where((table) =>
        and(
          eq(table.user.id, employerAuth.id),
          eq(table.employer.userId, employerAuth.id)
        )
      )
      .prepare('employer-profile-inner-join');

    // find the employer
    const result = await prepareInnerJoinStatement.execute();

    if (!result.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Employer profile not found.',
      });
    }

    const [{ employer, user }] = result;

    return { employer, user };
  }),

  updateProfile: employerProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const { user: employerAuth } = ctx.auth;

      const result = await db.transaction(async (tx) => {
        // find the employer
        const existingEmployer = await tx.query.employer.findFirst({
          where(table, { and, eq }) {
            return and(eq(table.userId, employerAuth.id));
          },
        });

        if (!existingEmployer) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Employer profile not found for update.',
          });
        }

        const [updatedEmployer] = await tx
          .update(employerTable)
          .set({
            companyName: input.companyName,
            companyDescription: input.companyDescription,
            companyLogoUrl: input.companyLogoUrl,
            companyBannerUrl: input.companyBannerUrl,
            organizationType: input.organizationType,
            teamSize: input.teamSize,
            yearOfEstablishment: input.yearOfEstablishment,
            companyWebsite: input.companyWebsite,
            location: input.location,
          })
          .where(
            and(
              eq(employerTable.userId, existingEmployer.userId),
              eq(employerTable.userId, employerAuth.id)
            )
          )
          .returning();

        const [updateUser] = await tx
          .update(userTable)
          .set({
            name: input.name,
            image: input.image,
            username: input.username,
            displayUsername: input.username,
            lang: input.lang,
            phoneNumber: input.phoneNumber,
            isActive: true,
          })
          .where(
            and(
              eq(userTable.id, employerAuth.id),
              eq(userTable.id, existingEmployer.userId)
            )
          )
          .returning();

        if (!updatedEmployer || !updateUser) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to update employer profile.',
          });
        }
        return updatedEmployer;
      });

      return result.companyName;
    }),
});
