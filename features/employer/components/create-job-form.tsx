'use client';

import { ProfileCompletionAlertDialog } from '@/components/shared/profile-completion-alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { useUpgradeModal } from '@/features/subscriptions/use-upgrade-modal';
import {
  CreateJobInput,
  createJobSchema,
} from '@/lib/zodSchemas/employer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconReload } from '@tabler/icons-react';
import type { Resolver } from 'react-hook-form';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import {
  useCreateJob,
  useIsEmployerProfileComplete,
} from '../hooks/use-employers';
import AdditionalInputs from './additional-inputs';
import ApplyJobInput from './apply-job-input';
import DescriptionInput from './description-input';
import ExperienceInput from './experience-input';
import ExpiryJobInput from './expiry-job-input';
import JobBenefits from './job-benefits';
import JobLevelInput from './job-level-input';
import JobTypeInput from './job-type-input';
import LocationInput from './location-input';
import QualificationInput from './qualification-input';
import ResponsibilitiesInput from './responsibilities-input';
import SalaryInputs from './salary-inputs';
import TagsInput from './tags-input';
import TitleInput from './title-input';
import VacancyInput from './vacancy-input';
import WorkTypeInput from './work-type-input';

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
      tags: isDev ? ['CSS', 'AWS', 'HTML'] : undefined,
      salary: {
        min: 15000,
        max: 350000,
        currency: isDev ? 'USD' : undefined,
        period: isDev ? 'hourly' : undefined,
      },
      benefits: isDev ? ['childcare_assistance', 'dental_insurance'] : [],
      city: isDev ? 'Kolkata, India' : '',
      country: isDev ? 'India' : '',
      jobType: isDev ? 'on_site' : undefined,
      jobLevel: isDev ? 'associate' : undefined,
      workType: isDev ? 'contract' : undefined,
      qualification: isDev ? 'associate_degree' : undefined,
      experience: isDev ? '1 year' : undefined,
      vacancy: isDev ? '1 vacancy' : undefined,
      responsibilities: isDev ? 'Here goes some responsibilities details' : '',
      expiryDate: new Date(),
      isFeatured: false,
      isActive: false,
    },
    mode: 'onChange',
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
          <FieldGroup className={'relative'}>
            <FieldSet>
              <FieldLegend>Create a Job</FieldLegend>
              <FieldDescription>
                Fill out the form below to create a new job posting.
              </FieldDescription>

              <div className={'absolute top-4 right-4'}>
                <Button
                  type='button'
                  size={'icon-sm'}
                  onClick={() => form.reset()}>
                  <IconReload className={'size-4'} />
                </Button>
              </div>
              <FieldGroup className={'gap-4'}>
                <TitleInput />

                <div className={'grid grid-cols-3 gap-4'}>
                  <TagsInput />
                  <JobLevelInput />
                </div>

                <FieldSeparator />
                <SalaryInputs />
                <FieldSeparator />

                <div className={'grid grid-cols-1 lg:grid-cols-3 gap-4'}>
                  <ExperienceInput />
                  <QualificationInput />
                  <JobTypeInput />
                  <VacancyInput />
                  <ExpiryJobInput />
                  <WorkTypeInput />
                </div>
                <FieldSeparator />
                <JobBenefits />
                <FieldSeparator />
                <LocationInput />

                <FieldSeparator />
                <DescriptionInput />

                <ResponsibilitiesInput />

                <FieldSeparator />

                <AdditionalInputs />
                <FieldSeparator />

                <ApplyJobInput />
                <FieldSeparator />
              </FieldGroup>
            </FieldSet>

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
          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  );
}
