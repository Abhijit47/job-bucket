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
import { jobLevels } from '@/drizzle/db-constants';
import { capitalizeFirstLetter } from '@/lib/utils';

export default function JobLevelInput() {
  const form = useFormContext<Pick<CreateJobInput, 'jobLevel'>>();

  return (
    <Controller
      name='jobLevel'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='level'>Job Level</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id='level' aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Select a job level' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify job level</SelectLabel>
                {jobLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {capitalizeFirstLetter(level)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState?.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Select the appropriate job level for this position.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
