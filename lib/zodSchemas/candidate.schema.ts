import z from 'zod';

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

      const allowed = [
        'application/pdf',
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      ];
      if (!allowed.includes(file.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Only PDF and Word documents are allowed',
        });
      }
    }),
  isPrimary: z.boolean('Select if this is your primary resume'),
});

export const resumeId = z.string().min(1, 'Resume ID is required');

export type ResumeFormValues = z.infer<typeof resumeFormSchema>;
export type ResumeId = z.infer<typeof resumeId>;
