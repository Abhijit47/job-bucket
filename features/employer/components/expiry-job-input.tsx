import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { format } from 'date-fns';
import { Controller, useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export default function ExpiryJobInput() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useFormContext<Pick<CreateJobInput, 'expiryDate'>>();

  const timeZone =
    typeof Intl === 'undefined'
      ? undefined
      : Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <Controller
      name='expiryDate'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='expiry-date'>Job Expiry Date</FieldLabel>

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                id='expiry-date'
                variant={'outline'}
                aria-invalid={fieldState.invalid}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !field.value && 'text-muted-foreground'
                )}>
                {field.value ? (
                  format(field.value, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}

                <CalendarIcon className='ml-auto size-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-(--radix-popover-trigger-width) p-0'
              align='start'>
              <Calendar
                animate={true}
                timeZone={timeZone}
                className={'w-full'}
                mode='single'
                selected={field.value}
                onSelect={(ev) => {
                  field.onChange(ev);
                  setIsOpen(false);
                }}
                disabled={(date) =>
                  date < new Date() || date < new Date('1900-01-01')
                }
                captionLayout='dropdown'
                footer={
                  <div className={'text-center'}>
                    <Separator className={'my-2'} />
                    <Badge variant={'outline'} className='text-xs'>
                      {format(field.value, 'eeee, MMMM do, yyyy')}
                    </Badge>
                  </div>
                }
              />
            </PopoverContent>
          </Popover>

          {fieldState.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Select the job expiry date.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
