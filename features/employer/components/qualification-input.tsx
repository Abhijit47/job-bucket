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
import { qualifications } from '@/drizzle/db-constants';
import { capitalizeFirstLetter } from '@/lib/utils';

export default function QualificationInput() {
  const form = useFormContext<Pick<CreateJobInput, 'qualifications'>>();

  return (
    <Controller
      name='qualifications'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='qualifications'>Qualification</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              id='qualifications'
              aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Select qualification' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify qualification</SelectLabel>
                {qualifications.map((qualification) => (
                  <SelectItem key={qualification} value={qualification}>
                    {capitalizeFirstLetter(qualification)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState?.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Specify the required qualification for the job position.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
