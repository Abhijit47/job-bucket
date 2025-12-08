'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconReload, IconTrashX } from '@tabler/icons-react';
import type { Resolver } from 'react-hook-form';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';

import { ProfileCompletionAlertDialog } from '@/components/shared/profile-completion-alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldSeparator } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useUpgradeModal } from '@/features/subscriptions/use-upgrade-modal';
import {
  CreateJobInput,
  createJobSchema,
} from '@/lib/zodSchemas/employer.schema';
import { useFormPersist } from '@liorpo/react-hook-form-persist';
import {
  useCreateJob,
  useIsEmployerProfileComplete,
} from '../hooks/use-employers';
import {
  JobAdditionalInputs,
  JobApplyOnInput,
  JobBenefitsInput,
  JobDescriptionInput,
  JobExperienceInput,
  JobExpiryInput,
  JobLevelInput,
  JobLocationInput,
  JobQualificationInput,
  JobResponsibilitiesInput,
  JobSalaryInputs,
  JobTagsInput,
  JobTitleInput,
  JobTypeInput,
  JobVacancyInput,
  JobWorkTypeInput,
} from './job-form-fields';

const isDev = process.env.NODE_ENV === 'development';

export default function CreateJobForm() {
  const createJob = useCreateJob();
  const { handleError, modal } = useUpgradeModal();
  const {
    data: isCompletedProfile,
    isPending,
    isLoading,
  } = useIsEmployerProfileComplete();

  const form = useForm<CreateJobInput>({
    resolver: zodResolver(
      createJobSchema
    ) as unknown as Resolver<CreateJobInput>,
    defaultValues: {
      title: isDev ? 'frontend developer' : '',
      description: isDev ? 'This is a job description' : '',
      tags: isDev ? ['css', 'aws', 'html'] : undefined,
      salary: {
        min: 15000,
        max: 350000,
        currency: isDev ? 'INR' : undefined,
        period: isDev ? 'hourly' : undefined,
      },
      benefits: isDev ? ['childcare_assistance', 'dental_insurance'] : [],
      city: isDev ? 'Kolkata, India' : '',
      country: isDev ? 'India' : '',
      jobType: isDev ? 'on_site' : undefined,
      jobLevel: isDev ? 'associate' : undefined,
      workType: isDev ? 'contract' : undefined,
      qualification: isDev ? 'associate_degree' : undefined,
      experience: isDev ? '1' : undefined,
      vacancy: isDev ? '1' : undefined,
      responsibilities: isDev ? 'Here goes some responsibilities details' : '',
      expiryDate: new Date(),
      isFeatured: false,
      isActive: false,
    },
    mode: 'onChange',
  });

  const { clear } = useFormPersist('create-job-form', {
    control: form.control,
    setValue: form.setValue,
    storage: sessionStorage, // Use sessionStorage instead of localStorage
    // exclude: ["password", "confirmPassword"], // Don't persist passwords
    debounceDelay: 500, // Save after 500ms of inactivity
    timeout: 24 * 60 * 60 * 1000, // 24 hours
    onTimeout: () => {
      // console.log('Form data expired');
      toast.info('Saved job form data has expired.');
    },
    validate: true, // Trigger validation when data is restored
    dirty: true, // Mark form as dirty
    touch: true, // Mark fields as touched
  });

  const onError: SubmitErrorHandler<CreateJobInput> = (errors) => {
    // console.log('Form Errors:', errors);
    Object.keys(errors).forEach((fieldName) => {
      // console.log(
      //   `Field: ${fieldName}, Error: ${
      //     errors[fieldName as keyof typeof errors]?.message
      //   }`
      // );
      toast.error(
        <pre className='text-xs overflow-y-auto max-h-20 text-wrap'>
          {`Error in ${fieldName}:`}{' '}
          {errors[fieldName as keyof typeof errors]?.message}
        </pre>
      );
    });
  };

  const onSubmit: SubmitHandler<CreateJobInput> = (values) => {
    if (values.tags.length === 0) {
      form.setError('tags', {
        type: 'manual',
        message: 'Please select at least one tag.',
      });
      toast.warning('Please select at least one tag.');
      return;
    }

    createJob.mutate(values, {
      onSuccess: () => {
        toast.success('Job posted successfully!');
        form.reset();
      },
      onError: (error) => {
        console.error(error);
        handleError(error);
        toast.error('Failed to post the job. Please try again later.');
      },
    });
  };

  return (
    <div className='w-full'>
      {modal}

      {isLoading || isPending ? (
        <div className='flex justify-center py-10'>
          <Spinner />
        </div>
      ) : (
        <ProfileCompletionAlertDialog
          isOpen={!isCompletedProfile}
          title='Employer Profile Incomplete'
          description='To post a job, please complete your employer profile first. This ensures that your job postings are credible and trustworthy.'
        />
      )}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <Card className={'p-0 w-full border-none shadow-none gap-4'}>
            <CardHeader className={'p-0'}>
              <CardTitle>Create a Job</CardTitle>
              <CardDescription>
                Fill out the form below to create a new job posting.
              </CardDescription>
              <CardAction className={'flex items-center gap-2'}>
                <Button
                  type='button'
                  size={'icon-sm'}
                  onClick={() => form.reset()}>
                  <IconReload className={'size-4'} />
                </Button>
                <Button
                  variant={'destructive'}
                  type='button'
                  size={'icon-sm'}
                  onClick={() => clear()}>
                  <IconTrashX className={'size-4'} />
                </Button>
              </CardAction>
            </CardHeader>
            <Separator />

            <CardContent className={'p-0'}>
              <FieldGroup className={'gap-4'}>
                <JobTitleInput />

                <div className={'grid grid-cols-3 gap-4'}>
                  <JobTagsInput />
                  <JobLevelInput />
                </div>

                <FieldSeparator />
                <JobSalaryInputs />
                <FieldSeparator />

                <div className={'grid grid-cols-1 lg:grid-cols-3 gap-4'}>
                  <JobExperienceInput />
                  <JobQualificationInput />
                  <JobTypeInput />
                  <JobVacancyInput />
                  <JobExpiryInput />
                  <JobWorkTypeInput />
                </div>
                <FieldSeparator />
                <JobBenefitsInput />
                <FieldSeparator />
                <JobLocationInput />

                <FieldSeparator />
                <JobDescriptionInput />

                <JobResponsibilitiesInput />

                <FieldSeparator />

                <JobAdditionalInputs />
                <FieldSeparator />

                <JobApplyOnInput />
              </FieldGroup>
            </CardContent>
            <Field orientation='horizontal'>
              <Button type='submit' disabled={createJob.isPending}>
                {createJob.isPending ? (
                  <span className={'inline-flex items-center gap-2'}>
                    Posting...
                    <Spinner />
                  </span>
                ) : (
                  <span>Post Job</span>
                )}
              </Button>
              <Button
                variant='outline'
                type='reset'
                disabled={createJob.isPending}
                onClick={() => form.reset()}>
                Cancel
              </Button>
            </Field>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
}
