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
  CreateJobInput,
  createJobSchema,
} from '@/lib/zodSchemas/employer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateJob } from '../hooks/use-employers';
import AdditionalInputs from './additional-inputs';
import DescriptionInput from './description-input';
import ExperienceInput from './experience-input';
import JobLevelInput from './job-level-input';
import JobTypeInput from './job-type-input';
import LocationInput from './location-input';
import QualificationInput from './qualification-input';
import ResponsibilitiesInput from './responsibilities-input';
import SalaryInputs from './salary-inputs';
import TagsInput from './tags-input';
import TitleInput from './title-input';
import WorkTypeInput from './work-type-input';

const isDev = process.env.NODE_ENV === 'development' ? false : true;

export default function CreateJobForm() {
  const { mutate, isPending } = useCreateJob();

  const form = useForm<CreateJobInput>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: isDev ? 'frontend developer' : '',
      description: isDev ? 'This is a job description' : '',
      tags: undefined,
      salaryRange: [15000, 350000],
      salaryCurrency: isDev ? 'USD' : undefined,
      salaryPeriod: isDev ? 'hourly' : undefined,
      location: isDev ? 'Kolkata, India' : undefined,
      jobType: isDev ? 'on_site' : undefined,
      workType: isDev ? 'contract' : undefined,
      jobLevel: isDev ? 'associate' : undefined,
      experience: isDev ? 'Here goes some experience details' : undefined,
      qualification: isDev ? 'associate_degree' : undefined,
      responsibilities: isDev
        ? 'Here goes some responsibilities details'
        : undefined,
      isFeatured: undefined,
      isActive: undefined,
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
      toast.error('Please select at least one tag.');
      return;
    }
    console.log('Form values:', values);

    mutate(values);
  };

  return (
    <div className='w-full'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Create a Job</FieldLegend>
              <FieldDescription>
                Fill out the form below to create a new job posting.
              </FieldDescription>
              <FieldGroup className={'gap-4'}>
                <TitleInput />

                <DescriptionInput />

                <TagsInput />

                <FieldSeparator />
                <SalaryInputs />
                <FieldSeparator />

                <LocationInput />

                <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                  <JobTypeInput />

                  <JobLevelInput />
                </div>

                <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                  <WorkTypeInput />

                  <QualificationInput />
                </div>

                <ExperienceInput />

                <ResponsibilitiesInput />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />

            <AdditionalInputs />

            <Field orientation='horizontal'>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <span className={'inline-flex items-center gap-2'}>
                    Creating...
                    <Spinner />
                  </span>
                ) : (
                  <span>Create Job</span>
                )}
              </Button>
              <Button
                variant='outline'
                type='reset'
                disabled={isPending}
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
