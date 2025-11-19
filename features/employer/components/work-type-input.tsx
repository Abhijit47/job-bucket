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
import { workTypes } from '@/drizzle/db-constants';
import { capitalizeFirstLetter } from '@/lib/utils';

export default function WorkTypeInput() {
  const form = useFormContext<Pick<CreateJobInput, 'workType'>>();

  return (
    <Controller
      name='workType'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='work-type'>Work type</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id='work-type' aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Select a work type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify work type</SelectLabel>
                {workTypes.map((type) => (
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
              Specify the type of work arrangement for this job.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
