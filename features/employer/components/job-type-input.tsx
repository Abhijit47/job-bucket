import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { jobTypes } from '@/drizzle/db-constants';
import { capitalizeFirstLetter } from '@/lib/utils';

export default function JobTypeInput() {
  const form = useFormContext<Pick<CreateJobInput, 'jobType'>>();

  return (
    <Controller
      name='jobType'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='type'>Job type</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id='type' aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Select a job type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify job type</SelectLabel>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {capitalizeFirstLetter(type)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState?.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Select the type of job position.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
