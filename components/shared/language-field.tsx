'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useTransition } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import FieldErrorMessageAndDescription from '@/features/candidate/components/field-error-message-and-description';
import { getLanguages } from '@/lib/dynamic-loaded';
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

export default function LanguageField() {
  const [languages, setLanguages] = useState<KnownLanguage[] | undefined>();
  const [isLanguageTransition, startLanguageTransition] = useTransition();

  const form = useFormContext<Pick<CandidateProfileFormValues, 'language'>>();

  useEffect(() => {
    startLanguageTransition(async () => {
      const data = await getLanguages();
      setLanguages(data);
    });
  }, []);

  return (
    <Controller
      name='language'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='known-language'>Known Language</FieldLabel>
          {isLanguageTransition ? (
            <Skeleton className={'h-9 w-full animate-pulse'} />
          ) : (
            <Select
              disabled={!languages || isLanguageTransition}
              value={JSON.stringify(field.value)}
              onValueChange={(e) => field.onChange(JSON.parse(e))}>
              <SelectTrigger
                id='known-language'
                aria-invalid={fieldState.invalid}>
                <SelectValue placeholder='Select your language' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose your language</SelectLabel>
                </SelectGroup>
                {languages?.map((language) => (
                  <SelectItem
                    key={crypto.randomUUID()}
                    value={JSON.stringify(language)}>
                    {language.name} ({language.native})
                  </SelectItem>
                ))}
              </SelectContent>
              <FieldErrorMessageAndDescription
                error={fieldState.error}
                description='Your preferred language'
              />
            </Select>
          )}
        </Field>
      )}
    />
  );
}

export const LazyLanguageField = dynamic(() => import('./language-field'), {
  ssr: false,
  loading: () => (
    <div className={'space-y-2'}>
      <Skeleton className={'h-3 w-3/12 animate-pulse'} />
      <Skeleton className={'h-9 w-full animate-pulse'} />
      <Skeleton className={'h-2 w-6/12 animate-pulse'} />
    </div>
  ),
});
