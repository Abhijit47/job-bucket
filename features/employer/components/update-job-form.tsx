'use client';

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
import {
  UpdateJobInput,
  updateJobSchema,
} from '@/lib/zodSchemas/employer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconReload } from '@tabler/icons-react';
import {
  FormProvider,
  type Resolver,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { useGetMyJob, useUpdateJob } from '../hooks/use-employers';
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

export default function UpdateJobForm({ jobId }: { jobId: string }) {
  const {
    data,
    isPending: isGetPending,
    isLoading: isGetLoading,
  } = useGetMyJob(jobId);
  const { mutate, isPending: isUpdatePending } = useUpdateJob();

  const form = useForm<UpdateJobInput>({
    resolver: zodResolver(
      updateJobSchema
    ) as unknown as Resolver<UpdateJobInput>,
    defaultValues: {
      title: data.title || '',
      description: data.description || '',
      tags: data.tags || [],
      salary: data.salary,
      benefits: data.benefits || [],
      city: data.city || '',
      country: data.country || '',
      jobType: data.jobType,
      jobLevel: data.jobLevel,
      workType: data.workType,
      qualification: data.qualification,
      experience: data.experience,
      vacancy: data.vacancy,
      responsibilities: data.responsibilities || '',
      // expiryDate: new Date(data.expiryDate),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
      isFeatured: data.isFeatured,
      isActive: data.isActive,
    },
    mode: 'onChange',
  });

  const onError: SubmitErrorHandler<UpdateJobInput> = (errors) => {
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

  // useEffect(() => {
  //   form.setValue('id', jobId);
  // }, [jobId, form]);

  form.setValue('id', jobId);
  const onSubmit: SubmitHandler<UpdateJobInput> = (values) => {
    if (values?.tags?.length === 0) {
      form.setError('tags', {
        type: 'manual',
        message: 'Please select at least one tag.',
      });
      toast.error('Please select at least one tag.');
      return;
    }

    mutate(values);
  };

  return (
    <div className='w-full'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <FieldGroup className={'relative'}>
            <FieldSet>
              <FieldLegend>Update Job</FieldLegend>
              <FieldDescription>
                Update the details of your job posting using the form below.
              </FieldDescription>

              <div className={'absolute top-4 right-4'}>
                <Button
                  type='button'
                  size={'icon-sm'}
                  onClick={() => form.reset()}>
                  <IconReload className={'size-4'} />
                </Button>
              </div>
              <FieldSeparator />
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
              <Button
                type='submit'
                disabled={isGetPending || isUpdatePending || isGetLoading}>
                {isUpdatePending ? (
                  <span className={'inline-flex items-center gap-2'}>
                    Updating...
                    <Spinner />
                  </span>
                ) : (
                  <span>Update Job</span>
                )}
              </Button>
              <Button
                variant='outline'
                type='reset'
                disabled={isGetPending || isUpdatePending || isGetLoading}
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
