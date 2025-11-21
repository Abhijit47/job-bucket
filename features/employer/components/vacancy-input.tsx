import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { vacancies } from '@/drizzle/db-constants';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext } from 'react-hook-form';

export default function VacancyInput() {
  const form = useFormContext<Pick<CreateJobInput, 'vacancy'>>();

  return (
    <Controller
      name='vacancy'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='vacancy'>Vacancy</FieldLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className='w-full'
              id='vacancy'
              aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Ex. 1' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify vacancy</SelectLabel>
                {vacancies.map((vacancy) => (
                  <SelectItem key={vacancy} value={vacancy}>
                    {vacancy}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Specify vacancy for the job.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
