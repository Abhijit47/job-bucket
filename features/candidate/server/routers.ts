import { db } from '@/drizzle/db';
import { resume } from '@/drizzle/schemas';
import { resumeFormSchema, resumeId } from '@/lib/zodSchemas/candidate.schema';
import { candidateProcedure, createTRPCRouter } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
// import { writeFile } from 'fs/promises';
// import { join } from 'path';

export const candidatesRouter = createTRPCRouter({
  uploadResume: candidateProcedure
    .input(resumeFormSchema.omit({ resumeFile: true }))
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const { fileUrl, fileName, fileSize, fileType } = input;

      if (!fileUrl || !fileName || !fileSize || !fileType) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'File upload data is incomplete.',
          cause: 'MISSING_FILE_DATA',
        });
      }

      const newResume = await db
        .insert(resume)
        .values({
          applicantId: auth.user.id,
          fileUrl: fileUrl,
          fileSize: fileSize,
          fileType: fileType,
          isPrimary: input.isPrimary,
        })
        .returning({ id: resume.id, applicantId: resume.applicantId });

      return newResume;
    }),

  makeResumePrimary: candidateProcedure
    .input(resumeId)
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const resumeId = input;
      // First, set all resumes of the user to isPrimary = false
      await db
        .update(resume)
        .set({ isPrimary: false })
        .where(eq(resume.applicantId, auth.user.id));

      // Then, set the selected resume to isPrimary = true
      const result = await db
        .update(resume)
        .set({ isPrimary: true })
        .where(
          and(eq(resume.id, resumeId), eq(resume.applicantId, auth.user.id))
        )
        .returning({ id: resume.id, applicantId: resume.applicantId });
      return result;
    }),

  deleteResume: candidateProcedure
    .input(resumeId)
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const resumeId = input;

      const result = await db
        .delete(resume)
        .where(
          and(eq(resume.id, resumeId), eq(resume.applicantId, auth.user.id))
        )
        .returning({ applicantId: resume.applicantId });

      return result;
    }),

  getResumeById: candidateProcedure
    .input(resumeId)
    .query(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const resumeId = input;

      const resumeRecord = await db.query.resume.findFirst({
        where(table, { eq }) {
          return and(
            eq(table.id, resumeId),
            eq(table.applicantId, auth.user.id)
          );
        },
      });

      if (!resumeRecord) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Resume with ID ${resumeId} not found.`,
        });
      }

      return resumeRecord;
    }),

  getResumes: candidateProcedure.query(async ({ ctx }) => {
    const auth = ctx.auth;

    const resumes = await db.query.resume.findMany({
      where(table, { eq }) {
        return eq(table.applicantId, auth.user.id);
      },
    });

    return resumes;
  }),
});
