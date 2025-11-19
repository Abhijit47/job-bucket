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

export default function ExperienceInput() {
  const form = useFormContext<Pick<CreateJobInput, 'experience'>>();

  const watchExperience = useWatch({
    control: form.control,
    name: 'experience',
    compute: (value) => value?.length || 0,
  });

  return (
    <Controller
      name='experience'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='experience'>Experience</FieldLabel>
          <Textarea
            id='experience'
            placeholder='Describe the required experience for the job.'
            className='resize-none min-h-[120px]'
            {...field}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <div className={'inline-flex items-center justify-between'}>
              <FieldDescription className={'text-xs'}>
                Describe the required experience for the job.
              </FieldDescription>
              <Badge variant={'outline'} className='text-[10px]'>
                {watchExperience}/100
              </Badge>
            </div>
          )}
        </Field>
      )}
    />
  );
}
