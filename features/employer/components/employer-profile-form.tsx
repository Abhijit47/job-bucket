'use client';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconRestore } from '@tabler/icons-react';
import { FileEdit } from 'lucide-react';
import { useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';

import { LazyLocationFields } from '@/components/shared/location-fields';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldContent,
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
import {
  defaultCity,
  defaultCountry,
  defaultRegion,
  defaultState,
} from '@/lib/zodSchemas/common.schema';
import {
  UpdateProfileInput,
  updateProfileSchema,
} from '@/lib/zodSchemas/employer.schema';
import {
  useGetEmployerProfile,
  useUpdateEmployerProfile,
} from '../hooks/use-employers';
import {
  FieldActiveProfile,
  FieldCompanyDescription,
  FieldCompanyName,
  FieldCompanyStreetAddressWebsite,
  FieldEmailAndRole,
  FieldNameAndUserName,
  FieldOrganizationAndIndustry,
  FieldPhoneNumberAndLocale,
  FieldTeamSizeAndYear,
} from './employer-profile-fields';
import UploadImage from './upload-image';

const isDev = process.env.NODE_ENV === 'development';

export function EmployerProfileForm() {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const { data, isPending, isLoading } = useGetEmployerProfile();
  const { mutateAsync, isPending: isUpdatePending } =
    useUpdateEmployerProfile();

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      // employer fields
      companyName: data?.employer?.companyName || '',
      companyDescription: data?.employer?.companyDescription || '',
      companyLogoUrl: data?.employer?.companyLogoUrl ?? '',
      companyBannerUrl: data?.employer?.companyBannerUrl ?? '',
      organizationType: data?.employer?.organizationType || undefined,
      industryType: data?.employer?.industryType || undefined,
      teamSize: data?.employer?.teamSize || undefined,
      yearOfEstablishment: data?.employer?.yearOfEstablishment || '',
      companyWebsite: data?.employer?.companyWebsite || '',
      streetAddress: data?.employer?.streetAddress || '',
      location: {
        region: data?.employer.location?.region ?? defaultRegion,
        country: data?.employer?.location?.country ?? defaultCountry,
        state: data?.employer?.location?.state ?? defaultState,
        city: data?.employer?.location?.city ?? defaultCity,
      },

      // user fields
      name: data?.user?.name || '',
      username: data?.user?.username || '',
      phoneNumber: data?.user?.phoneNumber || '',
      image: data?.user?.image || '',
      locale: data?.user?.locale || 'en-US',
      isActive: data?.user?.isActive || false,
    },
    mode: 'onChange',
  });

  const onError: SubmitErrorHandler<UpdateProfileInput> = (errors) => {
    // console.log('Form errors:', errors);
    Object.values(errors).forEach((error) => {
      if (error.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit: SubmitHandler<UpdateProfileInput> = (data) => {
    mutateAsync(data, {
      onSuccess: () => {
        setIsAvailable(false);
      },
    });
  };

  return (
    <div className='w-full'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <FieldSet disabled={isPending || isLoading}>
            <FieldLegend>Update Profile and Company Information</FieldLegend>
            <FieldDescription>
              Update your personal and company profile information below.
            </FieldDescription>
            <FieldSeparator />

            <Card>
              <CardContent className={'space-y-4'}>
                <FieldNameAndUserName
                  isAvailable={isAvailable}
                  setIsAvailable={setIsAvailable}
                />

                <FieldEmailAndRole />

                <FieldPhoneNumberAndLocale />

                <Controller
                  name='image'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      aria-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel htmlFor='image'>Avatar URL</FieldLabel>
                        <Input
                          id='image'
                          placeholder='https://example.com'
                          autoComplete='off'
                          defaultValue={data.user.image}
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error?.message ? (
                          <FieldError
                            className={'text-xs'}
                            errors={[fieldState.error]}
                          />
                        ) : (
                          <FieldDescription className={'text-xs'}>
                            Provide your avatar URL
                          </FieldDescription>
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />

                <UploadImage maxFiles={1} />
              </CardContent>
            </Card>

            <FieldSeparator />

            <Card>
              <CardContent className={'space-y-4'}>
                <FieldCompanyName />

                <FieldCompanyDescription />

                <FieldTeamSizeAndYear />

                <FieldOrganizationAndIndustry />

                <FieldCompanyStreetAddressWebsite />

                <LazyLocationFields />

                <FieldActiveProfile />

                <FieldGroup className={'gap-4'}>
                  <FieldSeparator />

                  <Field orientation='responsive'>
                    <Button type='submit' disabled={isUpdatePending}>
                      {isUpdatePending ? (
                        <span className={'inline-flex items-center gap-2'}>
                          Updating...
                          <Spinner className='size-4' />
                        </span>
                      ) : (
                        <span className={'inline-flex items-center gap-2'}>
                          Update <FileEdit className={'size-4'} />
                        </span>
                      )}
                    </Button>
                    <Button
                      disabled={isUpdatePending}
                      type='reset'
                      variant='outline'
                      onClick={() => form.reset()}>
                      Cancel <IconRestore className='size-4' />
                    </Button>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </FieldSet>
        </form>
        {isDev ? <DevTool control={form.control} id='employer-form' /> : null}
      </FormProvider>
    </div>
  );
}
