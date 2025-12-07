import { Controller, useFormContext, useWatch } from 'react-hook-form';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
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
  industries,
  organizationTypes,
  teamSizes,
} from '@/drizzle/db-constants';
import { capitalizeFirstLetter, establishmentYears } from '@/lib/utils';
import { UpdateCompanyProfileInput } from '@/lib/zodSchemas/employer.schema';

export function FieldCompanyName() {
  const form = useFormContext<Pick<UpdateCompanyProfileInput, 'companyName'>>();
  return (
    <Controller
      name='companyName'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor='companyName'>Company Name</FieldLabel>
            <Input
              id='companyName'
              placeholder='XYZ Company'
              autoComplete='organization'
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.error ? (
              <FieldError className={'text-xs'} errors={[fieldState.error]} />
            ) : (
              <FieldDescription>
                Provide company name for identification
              </FieldDescription>
            )}
          </FieldContent>
        </Field>
      )}
    />
  );
}

export function FieldCompanyDescription() {
  const form =
    useFormContext<Pick<UpdateCompanyProfileInput, 'companyDescription'>>();

  const watchedValue = useWatch({
    control: form.control,
    compute: (data: Pick<UpdateCompanyProfileInput, 'companyDescription'>) => {
      if (data.companyDescription?.length)
        return data.companyDescription.length;

      return 0;
    },
  });

  return (
    <Controller
      name='companyDescription'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          className={'relative'}
          orientation='responsive'
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldContent className={'flex-1'}>
            <FieldLabel htmlFor='companyDescription'>
              Company Description
            </FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id='companyDescription'
                placeholder='Hello, world!'
                className='min-h-[120px] overflow-y-auto resize-none w-full relative'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <InputGroupAddon align='block-end'>
                <InputGroupText className='ml-auto text-xs'>
                  {watchedValue}/2048
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.error ? (
              <FieldError className={'text-xs'} errors={[fieldState.error]} />
            ) : (
              <FieldDescription className={'text-xs'}>
                You can write your company description here. Keep it short,
                preferably under 2048 characters.
              </FieldDescription>
            )}
          </FieldContent>
        </Field>
      )}
    />
  );
}

export function FieldOrganizationAndIndustry() {
  const form =
    useFormContext<
      Pick<UpdateCompanyProfileInput, 'organizationType' | 'industryType'>
    >();

  return (
    <FieldGroup className={'flex-row gap-4'}>
      <Controller
        name='organizationType'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='organizationType'>
                Organization Type
              </FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className='w-full'
                  id='organizationType'
                  aria-invalid={fieldState.invalid}>
                  {field.value ? (
                    <SelectValue>
                      {capitalizeFirstLetter(field.value)}
                    </SelectValue>
                  ) : (
                    <SelectValue
                      id='organizationType'
                      placeholder='Select a type'
                    />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Organization Type</SelectLabel>
                    {organizationTypes.map((type) => (
                      <SelectItem value={type} key={type}>
                        {capitalizeFirstLetter(type)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.error ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide organization type for your company
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name='industryType'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='industryType'>Industry Type</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className='w-full'
                  id='industryType'
                  aria-invalid={fieldState.invalid}>
                  {field.value ? (
                    <SelectValue>
                      {capitalizeFirstLetter(field.value)}
                    </SelectValue>
                  ) : (
                    <SelectValue
                      id='industryType'
                      placeholder='Select a type'
                    />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industry Type</SelectLabel>
                    {industries.map((type) => (
                      <SelectItem value={type} key={type}>
                        {capitalizeFirstLetter(type)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.error ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide industry type for your company
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />
    </FieldGroup>
  );
}

export function FieldTeamSizeAndYear() {
  const form =
    useFormContext<
      Pick<UpdateCompanyProfileInput, 'teamSize' | 'yearOfEstablishment'>
    >();

  return (
    <FieldGroup className={'flex-row gap-4'}>
      <Controller
        name='teamSize'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            orientation='responsive'
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='teamSize'>Team size</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className='w-full'
                  id='teamSize'
                  aria-invalid={fieldState.invalid}>
                  {field.value ? (
                    <SelectValue>{field.value}</SelectValue>
                  ) : (
                    <SelectValue id='teamSize' placeholder='Select a size' />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Team size</SelectLabel>
                    {teamSizes.map((size) => (
                      <SelectItem value={size} key={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.error ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide the size of your team
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        name='yearOfEstablishment'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='yearOfEstablishment'>
                Year of establishment
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className='w-full'
                  id='yearOfEstablishment'
                  aria-invalid={fieldState.invalid}>
                  {field.value ? (
                    <SelectValue>{field.value}</SelectValue>
                  ) : (
                    <SelectValue
                      placeholder='Choose a year'
                      id='yearOfEstablishment'
                    />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Establishment year</SelectLabel>
                    {establishmentYears.map((year) => (
                      <SelectItem value={String(year)} key={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.error ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Select your company&apos;s year of establishment
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />
    </FieldGroup>
  );
}

export function FieldCompanyStreetAddressWebsite() {
  const form =
    useFormContext<
      Pick<UpdateCompanyProfileInput, 'streetAddress' | 'companyWebsite'>
    >();
  return (
    <FieldGroup className={'flex-row gap-4'}>
      <Controller
        name='companyWebsite'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='companyWebsite'>Company Website</FieldLabel>
              <Input
                id='companyWebsite'
                placeholder='https://example.com'
                autoComplete='off'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.error ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide your company website URL
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name='streetAddress'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='streetAddress'>Street Address</FieldLabel>
              <Input
                id='streetAddress'
                placeholder='123 Main St,'
                autoComplete='street-address'
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error?.message ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide your company street address
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />
    </FieldGroup>
  );
}
