import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext } from 'react-hook-form';

export default function TitleInput() {
  const form = useFormContext<Pick<CreateJobInput, 'title'>>();
  return (
    <Controller
      name='title'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='title'>Title</FieldLabel>
          <Input
            id='title'
            placeholder='Frontend developer'
            {...field}
            aria-invalid={fieldState.invalid}
          />
          {fieldState?.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              A clear and concise title for the job position.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
