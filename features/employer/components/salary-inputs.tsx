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
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { capitalizeFirstLetter } from 'better-auth';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

export default function SalaryInputs() {
  const min_price = 15000;
  const max_price = 2500000;

  const form =
    useFormContext<
      Pick<CreateJobInput, 'salaryRange' | 'salaryCurrency' | 'salaryPeriod'>
    >();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'standard',
    }).format(price);
  };

  const watchSalaryMin = useWatch({
    control: form.control,
    name: 'salaryRange.0',
    compute: (value) => value || 15000,
  });

  const watchSalaryMax = useWatch({
    control: form.control,
    name: 'salaryRange.1',
    compute: (value) => value || 350000,
  });
  return (
    <>
      <Controller
        name='salaryRange'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='salary-range'>Salary Range</FieldLabel>
            {fieldState.error ? (
              <FieldError errors={[fieldState.error]} className={'text-xs'} />
            ) : (
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
            )}
            <Slider
              id='salary-range'
              value={[watchSalaryMin, watchSalaryMax]}
              onValueChange={field.onChange}
              min={min_price}
              max={max_price}
              aria-label='Salary range slider'
              aria-invalid={fieldState.invalid}
            />
          </Field>
        )}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Controller
          name='salaryCurrency'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='currency'>Currency</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
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
          name='salaryPeriod'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='salaryPeriods'>Salary Periods</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id='salaryPeriods'
                  aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder='YYYY' className={'capitalize'} />
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

              {fieldState.error ? (
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
