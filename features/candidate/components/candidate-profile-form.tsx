'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { LazyLocationFields } from '@/components/shared/location-fields';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import {
  candidateProfileFormSchema,
  CandidateProfileFormValues,
} from '@/lib/zodSchemas/candidate.schema';
import {
  defaultCity,
  defaultCountry,
  defaultLanguage,
  defaultRegion,
  defaultState,
} from '@/lib/zodSchemas/common.schema';
import { IconAlertHexagon, IconCircleCheck } from '@tabler/icons-react';
import {
  FieldBiography,
  FieldDobAndGender,
  FieldEmailAndPhone,
  FieldExperienceAndQualification,
  FieldLocaleAndLanguage,
  FieldNameAndUsername,
  FieldNationalityAndMaritalStatus,
  FieldWebsiteUrlAndAvatarUrl,
} from './candidate-fields';

// const defaultValues: DefaultValues<CandidateProfileFormValues> = {
//   name: '',
//   email: '',
//   image: '',
//   username: '',
//   language: { code: '', name: '', native: '' },
//   locale: undefined,
//   phone: '',
//   biography: '',
//   dateOfBirth: undefined,
//   nationality: undefined,
//   maritalStatus: undefined,
//   gender: undefined,
//   experience: undefined,
//   qualification: undefined,
//   websiteUrl: '',
//   location: {
//     region: { id: '0', name: '', hasCountries: false },
//     country: { id: 0, name: '', code: '', hasStates: false },
//     state: { id: 0, name: '', code: '', hasCities: false },
//     city: { id: 0, name: '', latitude: undefined, longitude: undefined },
//   },
// };

export default function CandidateProfileForm() {
  const form = useForm<CandidateProfileFormValues>({
    resolver: zodResolver(candidateProfileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      image: '',
      username: '',
      language: defaultLanguage,
      locale: undefined,
      phone: '',
      biography: '',
      dateOfBirth: undefined,
      nationality: undefined,
      maritalStatus: undefined,
      gender: undefined,
      experience: undefined,
      qualification: undefined,
      websiteUrl: '',
      location: {
        region: defaultRegion,
        country: defaultCountry,
        state: defaultState,
        city: defaultCity,
      },
    },
    mode: 'onChange',
  });

  // TODO:
  const onError: SubmitErrorHandler<CandidateProfileFormValues> = (errors) => {
    console.log('Form errors:', errors);
  };

  // TODO:
  const onSubmit: SubmitHandler<CandidateProfileFormValues> = (data) => {
    console.log('Form data:', data);
  };

  function handleResetForm() {
    const defaultVals = form.formState.defaultValues;
    form.reset(defaultVals);
  }

  return (
    <div className='w-full'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Your profile</FieldLegend>
              <FieldDescription>
                Fill in the details to complete your profile
              </FieldDescription>

              {form.formState.isDirty ? (
                <Alert variant='warning'>
                  <IconAlertHexagon className={'size-4'} />
                  <AlertTitle>
                    You have unsaved changes in your profile.
                  </AlertTitle>
                </Alert>
              ) : (
                <Alert variant='success'>
                  <IconCircleCheck className={'size-4'} />
                  <AlertTitle>Your profile is up to date.</AlertTitle>
                </Alert>
              )}

              <FieldNameAndUsername />

              <FieldEmailAndPhone />

              <FieldWebsiteUrlAndAvatarUrl />

              <FieldLocaleAndLanguage />

              <FieldNationalityAndMaritalStatus />

              <FieldExperienceAndQualification />

              <FieldDobAndGender />

              <FieldBiography />

              <LazyLocationFields />
            </FieldSet>

            <FieldSeparator />

            <Field orientation='horizontal'>
              <Button type='submit'>Submit</Button>
              <Button variant='outline' type='button' onClick={handleResetForm}>
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  );
}
