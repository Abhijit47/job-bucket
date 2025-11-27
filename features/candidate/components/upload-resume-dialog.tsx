'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { $fetch } from '@/lib/fetch';
import {
  resumeFormSchema,
  ResumeFormValues,
} from '@/lib/zodSchemas/candidate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCircleX, IconFilePlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { Spoiler } from 'spoiled';
import { useUploadResume } from '../hooks/use-candidates';

export default function UploadResumeDialog({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { mutate, isPending: isUploadPending } = useUploadResume();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      applicantId: userId,
      resumeFile: undefined,
      isPrimary: false,
    },
    mode: 'onChange',
  });

  function closeUploadDialog() {
    setIsOpen(false);
  }

  const onError: SubmitErrorHandler<ResumeFormValues> = (errors) => {
    console.log('Form errors:', errors);

    Object.values(errors).forEach((error) => {
      if (error.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit: SubmitHandler<ResumeFormValues> = (values) => {
    // console.log('Form submitted:', values);
    startTransition(async () => {
      const formData = new FormData();
      formData.append('resumeFile', values.resumeFile as File);

      const { data, error } = await $fetch('/api/uploads/resume', {
        body: formData,
      });
      if (error) {
        // console.error({ error });
        if (error.status === 401) {
          toast.info('Session expired. Please log in again.');
          router.push('/login');
          return;
        }
        toast.error('Failed to upload resume.', { description: error.message });
        return;
      }

      const mutableData = {
        applicantId: userId,
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        fileSize: data.fileSize,
        fileType: data.fileType,
        isPrimary: values.isPrimary,
      };

      mutate(mutableData, {
        onSuccess: () => {
          closeUploadDialog();
          form.reset({ resumeFile: undefined, isPrimary: false });
        },
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <IconFilePlus />
          Add Resume
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <DialogHeader>
            <DialogTitle>Upload Resume</DialogTitle>
            <DialogDescription>
              Fill in the details to upload your new resume.
            </DialogDescription>
          </DialogHeader>
          <FieldSeparator className={'my-2'} />
          <FieldGroup className={'gap-4'}>
            <FieldSet>
              <FieldGroup className={'gap-4'}>
                <Controller
                  name='applicantId'
                  control={form.control}
                  disabled
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      aria-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='applicant-id'>
                        Applicant ID
                      </FieldLabel>
                      <Spoiler density={0.2} fps={16}>
                        <Input
                          id='applicant-id'
                          {...field}
                          className='select-none! cursor-not-allowed! blur-[1px]!'
                          aria-invalid={fieldState.invalid}
                        />
                      </Spoiler>
                    </Field>
                  )}
                />

                <Controller
                  name='resumeFile'
                  control={form.control}
                  disabled={isUploadPending || isPending}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      aria-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='resume'>Upload Resume</FieldLabel>
                      <Input
                        id='resume'
                        type='file'
                        accept='application/pdf, application/msword,.doc,.docx'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        // {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.error?.message ? (
                        <FieldError
                          errors={[fieldState.error]}
                          className={'text-xs'}
                        />
                      ) : (
                        <FieldDescription className={'text-xs'}>
                          Accepted formats: PDF, Word. Max size: 5MB.
                        </FieldDescription>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <Controller
              name='isPrimary'
              control={form.control}
              disabled={isUploadPending || isPending}
              render={({ field, fieldState }) => (
                <FieldSet
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldLegend>Is this Primary Resume</FieldLegend>
                  {fieldState.error?.message ? (
                    <FieldError
                      errors={[fieldState.error]}
                      className={'text-xs'}
                    />
                  ) : (
                    <FieldDescription className={'text-xs'}>
                      Set this resume as your primary resume for job
                      applications
                    </FieldDescription>
                  )}
                  <FieldGroup className={'gap-4'}>
                    <Field orientation='horizontal'>
                      <Checkbox
                        id='is-primary'
                        checked={field.value}
                        onCheckedChange={(e) => {
                          field.onChange(e);
                        }}
                        aria-invalid={fieldState.invalid}
                        disabled={isUploadPending || isPending}
                      />
                      <FieldLabel htmlFor='is-primary' className='font-normal'>
                        Use as Primary Resume
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              )}
            />
          </FieldGroup>
          <FieldSeparator className={'my-2'} />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                size={'sm'}
                type='button'
                variant='outline'
                disabled={isUploadPending || isPending}
                onClick={() => {
                  form.reset({ resumeFile: undefined, isPrimary: false });
                  closeUploadDialog();
                }}>
                <IconCircleX />
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isUploadPending || isPending}
              size={'sm'}
              type='submit'>
              {isUploadPending || isPending ? (
                <span className={'inline-flex items-center gap-2'}>
                  <Spinner />
                  Uploading...
                </span>
              ) : (
                <span className={'inline-flex items-center gap-2'}>
                  <IconFilePlus />
                  Upload Resume
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
