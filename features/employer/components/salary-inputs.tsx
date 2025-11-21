'use client';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { currencies, salaryPeriods } from '@/drizzle/db-constants';
import { capitalizeFirstLetter } from '@/lib/utils';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

export default function SalaryInputs() {
  const min_price = 15000;
  const max_price = 2500000;

  const form = useFormContext<Pick<CreateJobInput, 'salary'>>();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'standard',
    }).format(price);
  };

  const watchSalaryMin = useWatch({
    control: form.control,
    name: 'salary.min',
    compute: (value) => value || 15000,
  });

  const watchSalaryMax = useWatch({
    control: form.control,
    name: 'salary.max',
    compute: (value) => value || 350000,
  });

  return (
    <>
      <Controller
        name='salary'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='salary-range'>Salary Range</FieldLabel>
            {/* {fieldState.error ? (
              <FieldError errors={[fieldState.error]} className={'text-xs'} />
            ) : (
            )} */}
            <FieldDescription className='text-xs'>
              Set your salary range (
              <span className='font-medium tabular-nums'>
                {formatPrice(watchSalaryMin)}
              </span>{' '}
              -{' '}
              <span className='font-medium tabular-nums'>
                {formatPrice(watchSalaryMax)}
              </span>
              ).
            </FieldDescription>
            <Slider
              id='salary-range'
              value={[watchSalaryMin, watchSalaryMax]}
              onValueChange={(val) => {
                // console.log('Salary range slider value:', val);
                // spread the other values and update only min and max
                // field.onChange({ ...field.value, min, max });
                field.onChange({ min: val[0], max: val[1] });
                // but dont trigger validation on every change
                // form.setFocus('salary.max');
                // form.setFocus('salary.min');
                // form.clearErrors('salary.min');
                // form.clearErrors('salary.max');
                form.setValue('salary.currency', '');
                form.setValue('salary.period', 'hourly');
              }}
              min={min_price}
              max={max_price}
              step={5000}
              aria-label='Salary range slider'
              aria-invalid={fieldState.invalid}
            />
          </Field>
        )}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Controller
          name='salary.currency'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='currency'>Currency</FieldLabel>
              <Select
                value={field.value}
                onValueChange={(e) => {
                  field.onChange(e);
                  form.clearErrors('salary.currency');
                }}>
                <SelectTrigger id='currency' aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder='Select a currency' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {fieldState.error ? (
                <FieldError errors={[fieldState.error]} className={'text-xs'} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Select the currency for the salary.
                </FieldDescription>
              )}
            </Field>
          )}
        />

        <Controller
          name='salary.period'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='salaryPeriods'>Salary Periods</FieldLabel>
              <Select
                value={field.value}
                onValueChange={(e) => {
                  field.onChange(e);
                  form.clearErrors('salary.period');
                }}>
                <SelectTrigger
                  id='salaryPeriods'
                  aria-invalid={fieldState.invalid}>
                  <SelectValue
                    placeholder='Select a period'
                    className={'capitalize'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Salary Period</SelectLabel>
                    {salaryPeriods.map((period) => (
                      <SelectItem
                        key={period}
                        value={period}
                        className={'capitalize'}>
                        {capitalizeFirstLetter(period)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {fieldState.error?.message ? (
                <FieldError errors={[fieldState.error]} className={'text-xs'} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Select how often the salary is paid.
                </FieldDescription>
              )}
            </Field>
          )}
        />
      </div>
    </>
  );
}
