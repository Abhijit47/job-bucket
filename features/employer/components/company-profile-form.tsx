'use client';

// import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormPersist } from '@liorpo/react-hook-form-persist';
import { IconArrowBackUp, IconRestore, IconTrashX } from '@tabler/icons-react';
import { FileEdit } from 'lucide-react';
// import { useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';

import { LazyLocationFields } from '@/components/shared/location-fields';
import { LazyTextEditor } from '@/components/text-editor';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldSeparator } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import {
  defaultCity,
  defaultCountry,
  defaultRegion,
  defaultState,
} from '@/lib/zodSchemas/common.schema';
import {
  UpdateCompanyProfileInput,
  updateCompanyProfileSchema,
} from '@/lib/zodSchemas/employer.schema';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  useGetCompanyProfile,
  useUpdateCompanyProfile,
} from '../hooks/use-employers';
import {
  FieldCompanyName,
  FieldCompanyStreetAddressWebsite,
  FieldOrganizationAndIndustry,
  FieldTeamSizeAndYear,
} from './company-form-fields';

// const isDev = process.env.NODE_ENV === 'development';

export function CompanyProfileForm() {
  const { data, isPending, isLoading } = useGetCompanyProfile();
  const { mutateAsync, isPending: isUpdatePending } = useUpdateCompanyProfile();

  const form = useForm<UpdateCompanyProfileInput>({
    resolver: zodResolver(updateCompanyProfileSchema),
    defaultValues: {
      companyName: data?.companyName || '',
      companyDescription: data?.companyDescription || '',
      companyLogoUrl: data?.companyLogoUrl ?? '',
      companyBannerUrl: data?.companyBannerUrl ?? '',
      organizationType: data?.organizationType || undefined,
      industryType: data?.industryType || undefined,
      teamSize: data?.teamSize || undefined,
      yearOfEstablishment: data?.yearOfEstablishment || '',
      companyWebsite: data?.companyWebsite || '',
      streetAddress: data?.streetAddress || '',
      location: {
        region: data?.location?.region ?? defaultRegion,
        country: data?.location?.country ?? defaultCountry,
        state: data?.location?.state ?? defaultState,
        city: data?.location?.city ?? defaultCity,
      },
    },
    mode: 'onChange',
  });

  const { clear } = useFormPersist('company-form', {
    control: form.control,
    setValue: form.setValue,
    storage: sessionStorage, // Use sessionStorage instead of localStorage
    // exclude: ["password", "confirmPassword"], // Don't persist passwords
    debounceDelay: 500, // Save after 500ms of inactivity
    timeout: 24 * 60 * 60 * 1000, // 24 hours
    onTimeout: () => {
      // console.log('Form data expired');
      toast.info('Saved company form data has expired.');
    },
    validate: true, // Trigger validation when data is restored
    dirty: true, // Mark form as dirty
    touch: true, // Mark fields as touched
  });

  const onError: SubmitErrorHandler<UpdateCompanyProfileInput> = (errors) => {
    // console.log('Form errors:', errors);
    Object.values(errors).forEach((error) => {
      if (error.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit: SubmitHandler<UpdateCompanyProfileInput> = (data) => {
    mutateAsync(data, {
      // onSuccess: () => {
      //   setIsAvailable(false);
      // },
    });
  };

  return (
    <div className='w-full'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <Card>
            <CardHeader>
              <CardTitle>Update Company Information</CardTitle>
              <CardDescription>
                Update your company profile information below.
              </CardDescription>
              <CardAction className={'flex items-center gap-2'}>
                <Link
                  prefetch
                  href={'/employer/company-profile'}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                  })}>
                  <IconArrowBackUp className={'size-4'} />
                  Back to Profile
                </Link>
                <Button
                  type='button'
                  size='icon-sm'
                  variant='destructive'
                  onClick={() => clear()}>
                  <IconTrashX className='size-4' />
                </Button>
              </CardAction>
            </CardHeader>

            <Separator />

            <CardContent className={'space-y-4'}>
              <FieldCompanyName />

              <Controller
                name='companyDescription'
                control={form.control}
                render={({ field, fieldState }) => (
                  <LazyTextEditor
                    field={field}
                    fieldState={fieldState}
                    limit={2048}
                  />
                )}
              />

              <FieldTeamSizeAndYear />

              <FieldOrganizationAndIndustry />

              <FieldCompanyStreetAddressWebsite />

              <LazyLocationFields />
            </CardContent>
            <CardFooter>
              <FieldGroup className={'gap-4'}>
                <FieldSeparator />

                <Field orientation='responsive'>
                  <Button
                    type='submit'
                    disabled={isUpdatePending || isLoading || isPending}>
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
                    disabled={isUpdatePending || isLoading || isPending}
                    type='reset'
                    variant='outline'
                    onClick={() => form.reset()}>
                    Cancel <IconRestore className='size-4' />
                  </Button>
                </Field>
              </FieldGroup>
            </CardFooter>
          </Card>
        </form>
        {/* {isDev ? <DevTool control={form.control} id='employer-form' /> : null} */}
      </FormProvider>
    </div>
  );
}

export const LazyCompanyProfileForm = dynamic(
  () => import('./company-profile-form').then((mod) => mod.CompanyProfileForm),
  {
    ssr: false,
    loading: () => (
      <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className={'h-3 w-3/12'} />
            </CardTitle>
            <CardDescription>
              <Skeleton className={'h-3 w-4/12'} />
            </CardDescription>
            <CardAction className={'flex items-center gap-2'}>
              <Skeleton className={'h-8 w-24'} />
              <Skeleton className={'size-8'} />
            </CardAction>
          </CardHeader>
          <Separator />

          <CardContent className={'space-y-4'}>
            <div className={'space-y-2'}>
              <Skeleton className={'h-3 w-32'} />
              <Skeleton className={'h-9 w-full'} />
              <Skeleton className={'h-2 w-20'} />
            </div>
            <div className={'space-y-2'}>
              <Skeleton className={'h-3 w-32'} />
              <Skeleton className={'h-48 w-full'} />
              <Skeleton className={'h-2 w-20'} />
            </div>

            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                className={'grid grid-cols-1 md:grid-cols-2 gap-4'}
                key={idx}>
                <div className={'space-y-2'}>
                  <Skeleton className={'h-3 w-32'} />
                  <Skeleton className={'h-9 w-full'} />
                  <Skeleton className={'h-2 w-20'} />
                </div>
                <div className={'space-y-2'}>
                  <Skeleton className={'h-3 w-32'} />
                  <Skeleton className={'h-9 w-full'} />
                  <Skeleton className={'h-2 w-20'} />
                </div>
              </div>
            ))}
            <Separator />
          </CardContent>
          <CardFooter className={'space-x-4'}>
            <Skeleton className={'h-9 w-24'} />
            <Skeleton className={'h-9 w-24'} />
          </CardFooter>
        </Card>

        <Skeleton className={'h-2 w-full'} />
      </div>
    ),
  }
);
