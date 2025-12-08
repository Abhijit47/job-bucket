import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import MultiSelect from '@/components/extends/multi-select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  currencies,
  experiences,
  jobBenefits,
  jobLevels,
  jobTags,
  jobTypes,
  qualifications,
  salaryPeriods,
  vacancies,
  workTypes,
} from '@/drizzle/db-constants';

import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { applyOptions, CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { useGetEmployerProfile } from '../hooks/use-employers';

export function JobTitleInput() {
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

export function JobTagsInput() {
  const form = useFormContext<Pick<CreateJobInput, 'tags'>>();
  return (
    <Controller
      name='tags'
      control={form.control}
      defaultValue={[]}
      render={({ field, fieldState }) => (
        <Field
          className={'col-span-full lg:col-span-2'}
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='tags'>Tags</FieldLabel>
          <MultiSelect
            id='tags'
            options={jobTags}
            placeholder='Select tags...'
            inputPlaceholder='Select tags'
            emptyPlaceholder='No tags found.'
            multiple
            aria-invalid={fieldState.invalid}
            {...field}
          />
          {fieldState.error?.message ? (
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

export function JobLevelInput() {
  const form = useFormContext<Pick<CreateJobInput, 'jobLevel'>>();
  return (
    <Controller
      name='jobLevel'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          className={'col-span-full lg:col-span-1'}
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='level'>Job Level</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id='level' aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Select a job level' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify job level</SelectLabel>
                {jobLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {capitalizeFirstLetter(level)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState?.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Select the appropriate job level for this position.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}

export function JobSalaryInputs() {
  const min_price = 15000;
  const max_price = 2500000;

  const { data, isFetching, isLoading, isPending } = useGetEmployerProfile();

  const form = useFormContext<Pick<CreateJobInput, 'salary'>>();

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

  const watchCurrency = useWatch({
    control: form.control,
    name: 'salary.currency',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(data.locale || 'en-IN', {
      style: 'currency',
      currency: watchCurrency || 'INR',
      notation: 'standard',
    }).format(price);
  };

  return (
    <>
      {data.locale}
      <Controller
        name='salary'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='salary-range'>Salary Range</FieldLabel>
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
                field.onChange({ min: val[0], max: val[1] });
                // Reset related fields when salary range changes
                // form.setValue('salary.currency', 'INR');
                // form.setValue('salary.period', 'hourly');

                // Only set defaults if not already set
                if (!form.getValues('salary.currency')) {
                  form.setValue('salary.currency', 'INR');
                }
                if (!form.getValues('salary.period')) {
                  form.setValue('salary.period', 'hourly');
                }
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
          disabled={isFetching || isLoading || isPending}
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

export function JobExperienceInput() {
  const form = useFormContext<Pick<CreateJobInput, 'experience'>>();

  return (
    <Controller
      name='experience'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='experience'>Experience</FieldLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className='w-full'
              id='experience'
              aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Ex. 1 year' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify experience</SelectLabel>
                {experiences.map((exp) => (
                  <SelectItem key={exp} value={exp}>
                    {exp}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Specify experience for the job.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}

export function JobQualificationInput() {
  const form = useFormContext<Pick<CreateJobInput, 'qualification'>>();

  return (
    <Controller
      name='qualification'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='qualifications'>Qualification</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              id='qualifications'
              aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Select qualification' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify qualification</SelectLabel>
                {qualifications.map((qualification) => (
                  <SelectItem key={qualification} value={qualification}>
                    {capitalizeFirstLetter(qualification)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState?.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Specify the required qualification.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}

export function JobTypeInput() {
  const form = useFormContext<Pick<CreateJobInput, 'jobType'>>();

  return (
    <Controller
      name='jobType'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='type'>Job type</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id='type' aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Select a job type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify job type</SelectLabel>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {capitalizeFirstLetter(type)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState?.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Select the type of job position.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}

export function JobVacancyInput() {
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

export function JobExpiryInput() {
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
                      {field.value
                        ? format(field.value, 'eeee, MMMM do, yyyy')
                        : format(new Date(), 'eeee, MMMM do, yyyy')}
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

export function JobWorkTypeInput() {
  const form = useFormContext<Pick<CreateJobInput, 'workType'>>();

  return (
    <Controller
      name='workType'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='work-type'>Work type</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id='work-type' aria-invalid={fieldState.invalid}>
              <SelectValue placeholder='Select a work type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specify work type</SelectLabel>
                {workTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {capitalizeFirstLetter(type)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState?.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <FieldDescription className={'text-xs'}>
              Specify the type of work arrangement for this job.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}

export function JobBenefitsInput() {
  const form = useFormContext<Pick<CreateJobInput, 'benefits'>>();

  return (
    <Controller
      name='benefits'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='benefits'>Job Benefits</FieldLabel>
          <div className={'flex flex-wrap gap-4'} id='benefits'>
            {jobBenefits.map((benifit) => (
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
              Select some benefits.
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}

export function JobLocationInput() {
  const form = useFormContext<Pick<CreateJobInput, 'city' | 'country'>>();

  return (
    <Card className={'gap-4'}>
      <CardHeader>
        <CardTitle>
          <h3>Location</h3>
        </CardTitle>
        <CardDescription>Specify the job location details.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Controller
            name='country'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='country'>Country</FieldLabel>
                <Input
                  id='country'
                  placeholder='ex: USA'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error?.message ? (
                  <FieldError
                    errors={[fieldState.error]}
                    className={'text-xs'}
                  />
                ) : (
                  <FieldDescription className={'text-xs'}>
                    Specify the country.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name='city'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='city'>City</FieldLabel>
                <Input
                  id='city'
                  placeholder='ex: Los Angeles'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error?.message ? (
                  <FieldError
                    errors={[fieldState.error]}
                    className={'text-xs'}
                  />
                ) : (
                  <FieldDescription className={'text-xs'}>
                    Specify the city.
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function JobDescriptionInput() {
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
          {fieldState.error?.message ? (
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

export function JobResponsibilitiesInput() {
  const form = useFormContext<Pick<CreateJobInput, 'responsibilities'>>();

  const watchResponsibilities = useWatch({
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
          {fieldState.error?.message ? (
            <FieldError errors={[fieldState.error]} className={'text-xs'} />
          ) : (
            <div className={'inline-flex items-center justify-between'}>
              <FieldDescription className={'text-xs'}>
                Describe the job responsibilities.
              </FieldDescription>
              <Badge variant={'outline'} className='text-[10px]'>
                {watchResponsibilities}/2048
              </Badge>
            </div>
          )}
        </Field>
      )}
    />
  );
}

export function JobAdditionalInputs() {
  const form =
    useFormContext<Pick<CreateJobInput, 'isFeatured' | 'isActive'>>();

  return (
    <FieldSet>
      <FieldLabel>Additional Information</FieldLabel>
      <FieldDescription>
        Select additional options for the job posting.
      </FieldDescription>
      <FieldGroup data-slot='checkbox-group'>
        <Controller
          name='isFeatured'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              orientation='horizontal'
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <Checkbox
                id='isThisFeaturedJob'
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor='isThisFeaturedJob' className='font-normal'>
                Is this Featured job?
              </FieldLabel>
            </Field>
          )}
        />

        <Controller
          name='isActive'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              orientation='horizontal'
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <Checkbox
                id='isThisActiveJob'
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor='isThisActiveJob' className='font-normal'>
                Is this Active job?
              </FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}

export function JobApplyOnInput() {
  const form = useFormContext<Pick<CreateJobInput, 'applyOn'>>();
  return (
    <Card className={'gap-2'}>
      <CardHeader>
        <CardTitle>
          <h3>Apply Job on:</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name='applyOn'
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet>
              <RadioGroup
                orientation='vertical'
                className={'grid-cols-3'}
                value={field.value}
                onValueChange={field.onChange}>
                {applyOptions.map((option, idx) => (
                  <FieldLabel htmlFor={option.value} key={idx}>
                    <Field orientation='horizontal'>
                      <FieldContent>
                        <FieldTitle className={'font-medium'}>
                          {option.title}
                        </FieldTitle>
                        <FieldDescription className={'text-sm'}>
                          {option.description}
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value={option.value} id={option.value} />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
              {fieldState.error && (
                <FieldError errors={[fieldState.error]} className={'text-xs'} />
              )}
            </FieldSet>
          )}
        />
      </CardContent>
    </Card>
  );
}
