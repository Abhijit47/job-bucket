import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext } from 'react-hook-form';

export default function LocationInput() {
  const form = useFormContext<Pick<CreateJobInput, 'location'>>();

  return (
    <Controller
      name='location'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='location'>Location</FieldLabel>
          <Input
            id='location'
            placeholder='e.g., New York, NY'
            {...field}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.error ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Specify the job location.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
