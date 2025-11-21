import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { jobBenifits } from '@/drizzle/db-constants';
import { capitalizeFirstLetter } from '@/lib/utils';

export default function JobBenifits() {
  const form = useFormContext<Pick<CreateJobInput, 'benifits'>>();

  return (
    <Controller
      name='benifits'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='benifits'>Job Benifits</FieldLabel>
          <div className={'flex flex-wrap gap-4'} id='benifits'>
            {jobBenifits.map((benifit) => (
              <Badge
                key={benifit}
                aria-invalid={fieldState.invalid}
                variant='outline'
                className='relative gap-2 px-3 py-1.5'>
                <Checkbox
                  id={benifit}
                  aria-invalid={fieldState.invalid}
                  checked={field.value?.includes(benifit) || false}
                  onCheckedChange={(checked) =>
                    // setSelected(
                    //   checked
                    //     ? [...selected, benifit]
                    //     : selected.filter((item) => item !== benifit)
                    // )
                    field.onChange(
                      checked
                        ? [...(field.value || []), benifit]
                        : (field.value || []).filter((item) => item !== benifit)
                    )
                  }
                  className='data-[state=unchecked]:hidden'
                />
                <Label
                  htmlFor={benifit}
                  className='cursor-pointer select-none after:absolute after:inset-0'>
                  {capitalizeFirstLetter(benifit)}
                </Label>
              </Badge>
            ))}
          </div>
          {fieldState.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Select some benifits.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
