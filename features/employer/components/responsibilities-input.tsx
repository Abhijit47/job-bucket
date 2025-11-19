import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export default function ResponsibilitiesInput() {
  const form = useFormContext<Pick<CreateJobInput, 'responsibilities'>>();

  const watchResponsibilies = useWatch({
    control: form.control,
    name: 'responsibilities',
    compute: (value) => value?.length || 0,
  });

  return (
    <Controller
      name='responsibilities'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='responsibilities'>Responsibilities</FieldLabel>
          <Textarea
            id='responsibilities'
            placeholder='Describe the job responsibilities.'
            className='resize-none min-h-[120px]'
            {...field}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.error ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <div className={'inline-flex items-center justify-between'}>
              <FieldDescription className={'text-xs'}>
                Describe the job responsibilities.
              </FieldDescription>
              <Badge variant={'outline'} className='text-[10px]'>
                {watchResponsibilies}/2048
              </Badge>
            </div>
          )}
        </Field>
      )}
    />
  );
}
