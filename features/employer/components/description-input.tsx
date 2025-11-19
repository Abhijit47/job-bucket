import { Badge } from '@/components/ui/badge';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

export default function DescriptionInput() {
  const form = useFormContext<Pick<CreateJobInput, 'description'>>();

  const watchDescription = useWatch({
    control: form.control,
    name: 'description',
    compute: (value) => value?.length || 0,
  });

  return (
    <Controller
      name='description'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='job-description'>Description</FieldLabel>
          <Textarea
            id='job-description'
            placeholder='We are looking for a skilled frontend developer to join our team...'
            className='resize-none min-h-[120px]'
            {...field}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.error ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <div className={'inline-flex items-center justify-between'}>
              <FieldDescription className={'text-xs'}>
                A brief description of the job role and responsibilities.
              </FieldDescription>
              <Badge variant={'outline'} className='text-[10px]'>
                {watchDescription}/4096
              </Badge>
            </div>
          )}
        </Field>
      )}
    />
  );
}
