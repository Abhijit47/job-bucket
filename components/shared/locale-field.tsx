'use client';

import dynamic from 'next/dynamic';
import { Controller, useFormContext } from 'react-hook-form';

import { locales } from '@/drizzle/db-constants';
import FieldErrorMessageAndDescription from '@/features/candidate/components/field-error-message-and-description';
import { CandidateProfileFormValues } from '@/lib/zodSchemas/candidate.schema';
import { Field, FieldLabel } from '../ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Skeleton } from '../ui/skeleton';

export default function LocaleField() {
  const form = useFormContext<Pick<CandidateProfileFormValues, 'locale'>>();

  return (
    <Controller
      name='locale'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='preferred-locale'>Preferred Locale</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              id='preferred-locale'
              aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Select your locale' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choose your locale</SelectLabel>
              </SelectGroup>
              {locales.map((locale) => (
                <SelectItem key={locale} value={locale}>
                  {locale}
                </SelectItem>
              ))}
            </SelectContent>
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Your preferred locale'
            />
          </Select>
        </Field>
      )}
    />
  );
}

export const LazyLocaleField = dynamic(() => import('./locale-field'), {
  ssr: false,
  loading: () => (
    <div className={'space-y-2'}>
      <Skeleton className={'h-3 w-3/12 animate-pulse'} />
      <Skeleton className={'h-9 w-full animate-pulse'} />
      <Skeleton className={'h-2 w-6/12 animate-pulse'} />
    </div>
  ),
});
