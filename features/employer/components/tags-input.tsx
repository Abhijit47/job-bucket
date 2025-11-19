import MultiSelect from '@/components/extends/multi-select';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { jobTags } from '@/drizzle/db-constants';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext } from 'react-hook-form';

export default function TagsInput() {
  const form = useFormContext<Pick<CreateJobInput, 'tags'>>();

  return (
    <Controller
      name='tags'
      control={form.control}
      defaultValue={[]}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='tags'>Tags</FieldLabel>
          <MultiSelect
            id='tags'
            options={jobTags}
            value={field.value}
            onChange={field.onChange}
            placeholder='Select tags...'
            inputPlaceholder='Select tags'
            emptyPlaceholder='No tags found.'
            multiple
            aria-invalid={true}
          />
          {fieldState.error ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Select relevant tags for the job posting.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
