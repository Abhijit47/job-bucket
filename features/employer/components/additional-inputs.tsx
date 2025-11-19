'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext } from 'react-hook-form';

export default function AdditionalInputs() {
  const form =
    useFormContext<Pick<CreateJobInput, 'isFeatured' | 'isActive'>>();

  return (
    <FieldSet>
      <FieldLabel>Additional Information</FieldLabel>
      <FieldDescription>
        Select additional options for the job posting.
      </FieldDescription>
      <FieldGroup data-slot='checkbox-group'>
        <Controller
          name='isFeatured'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              orientation='horizontal'
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <Checkbox
                id='isThisFeaturedJob'
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor='isThisFeaturedJob' className='font-normal'>
                Is this Featured job?
              </FieldLabel>
            </Field>
          )}
        />

        <Controller
          name='isActive'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              orientation='horizontal'
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <Checkbox
                id='isThisActiveJob'
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor='isThisActiveJob' className='font-normal'>
                Is this Active job?
              </FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}
