import { IconCalendarCheck } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
  experiences,
  genders,
  locales,
  maritalStatus,
  nationalities,
  qualifications,
} from '@/drizzle/db-constants';
import { getLanguages } from '@/lib/dynamic-loaded';
import { capitalizeFirstLetter } from '@/lib/utils';
import { CandidateProfileFormValues } from '@/lib/zodSchemas/candidate.schema';
import FieldErrorMessageAndDescription from './field-error-message-and-description';

export const FieldNameAndUsername = () => {
  const form =
    useFormContext<Pick<CandidateProfileFormValues, 'name' | 'username'>>();

  return (
    <FieldGroup className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
      <Controller
        name='name'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='full-name'>Full Name</FieldLabel>
            <Input
              id='full-name'
              placeholder='Evil Rabbit'
              {...field}
              aria-invalid={fieldState.invalid}
            />
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Mention your full name'
            />
          </Field>
        )}
      />
      <Controller
        name='username'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='username'>Username</FieldLabel>
            <Input
              id='username'
              placeholder='bond007'
              {...field}
              aria-invalid={fieldState.invalid}
              autoComplete='off'
            />

            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Your unique username'
            />
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export const FieldEmailAndPhone = () => {
  const form =
    useFormContext<Pick<CandidateProfileFormValues, 'email' | 'phone'>>();

  return (
    <FieldGroup className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
      <Controller
        name='email'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              id='email'
              placeholder='someone@gmail.com'
              {...field}
              aria-invalid={fieldState.invalid}
            />
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Mention your email'
            />
          </Field>
        )}
      />
      <Controller
        name='phone'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='phone-number'>Phone Number</FieldLabel>
            <Input
              id='phone-number'
              placeholder='9999911111'
              {...field}
              aria-invalid={fieldState.invalid}
            />
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Mention your phone number'
            />
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export const FieldWebsiteUrlAndAvatarUrl = () => {
  const form =
    useFormContext<Pick<CandidateProfileFormValues, 'websiteUrl' | 'image'>>();

  return (
    <FieldGroup className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
      <Controller
        name='websiteUrl'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='website-url'>Website URL</FieldLabel>
            <Input
              id='website-url'
              placeholder='https://example.com'
              {...field}
              aria-invalid={fieldState.invalid}
            />
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Provide your website URL'
            />
          </Field>
        )}
      />
      <Controller
        name='image'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='image-url'>Avatar Image URL</FieldLabel>
            <Input
              id='image-url'
              placeholder='https://example.com/avatar.jpg'
              {...field}
              aria-invalid={fieldState.invalid}
            />
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='URL of your profile picture'
            />
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export const FieldLocaleAndLanguage = () => {
  const [languages, setLanguages] = useState<KnownLanguage[] | undefined>();

  const form =
    useFormContext<Pick<CandidateProfileFormValues, 'locale' | 'language'>>();

  useEffect(() => {
    getLanguages().then((data) => setLanguages(data));
  }, []);

  return (
    <FieldGroup className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
      <Controller
        name='locale'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='preferred-locale'>Preferred Locale</FieldLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id='preferred-locale'
                aria-invalid={fieldState.invalid}>
                <SelectValue placeholder='Select your locale' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose your locale</SelectLabel>
                </SelectGroup>
                {locales.map((locale) => (
                  <SelectItem key={locale} value={locale}>
                    {locale}
                  </SelectItem>
                ))}
              </SelectContent>
              <FieldErrorMessageAndDescription
                error={fieldState.error}
                description='Your preferred locale'
              />
            </Select>
          </Field>
        )}
      />

      <Controller
        name='language'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='known-language'>Known Language</FieldLabel>
            <Select
              defaultValue={JSON.stringify(field.value)}
              onValueChange={(e) => field.onChange(JSON.parse(e))}>
              <SelectTrigger
                id='known-language'
                aria-invalid={fieldState.invalid}>
                <SelectValue placeholder='Select your language' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose your language</SelectLabel>
                </SelectGroup>
                {languages?.map((language) => (
                  <SelectItem
                    key={crypto.randomUUID()}
                    value={JSON.stringify(language)}>
                    {language.name} ({language.native})
                  </SelectItem>
                ))}
              </SelectContent>
              <FieldErrorMessageAndDescription
                error={fieldState.error}
                description='Your preferred language'
              />
            </Select>
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export const FieldNationalityAndMaritalStatus = () => {
  const form =
    useFormContext<
      Pick<CandidateProfileFormValues, 'nationality' | 'maritalStatus'>
    >();

  return (
    <FieldGroup className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
      <Controller
        name='nationality'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='nationality'>Nationality</FieldLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger id='nationality' aria-invalid={fieldState.invalid}>
                <SelectValue placeholder='Select your nationality' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose your nationality</SelectLabel>
                </SelectGroup>
                {nationalities.map((nation) => (
                  <SelectItem key={nation} value={nation}>
                    {nation}
                  </SelectItem>
                ))}
              </SelectContent>
              <FieldErrorMessageAndDescription
                error={fieldState.error}
                description='Select your nationality'
              />
            </Select>
          </Field>
        )}
      />
      <Controller
        name='maritalStatus'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='marital-status'>Marital Status</FieldLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id='marital-status'
                aria-invalid={fieldState.invalid}>
                <SelectValue placeholder='Select your Marital Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose your Marital Status</SelectLabel>
                </SelectGroup>
                {maritalStatus.map((status) => (
                  <SelectItem key={status} value={status}>
                    {capitalizeFirstLetter(status)}
                  </SelectItem>
                ))}
              </SelectContent>
              <FieldErrorMessageAndDescription
                error={fieldState.error}
                description='Select your Marital Status'
              />
            </Select>
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export const FieldExperienceAndQualification = () => {
  const form =
    useFormContext<
      Pick<CandidateProfileFormValues, 'experience' | 'qualification'>
    >();

  return (
    <FieldGroup className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
      <Controller
        name='experience'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='experience'>Experience</FieldLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger id='experience' aria-invalid={fieldState.invalid}>
                <SelectValue placeholder='Select your experience' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose your experience</SelectLabel>
                </SelectGroup>
                {experiences.map((exp) => (
                  <SelectItem key={exp} value={exp}>
                    {capitalizeFirstLetter(exp)}
                  </SelectItem>
                ))}
              </SelectContent>
              <FieldErrorMessageAndDescription
                error={fieldState.error}
                description='Select your experience'
              />
            </Select>
          </Field>
        )}
      />

      <Controller
        name='qualification'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='qualification'>Qualification</FieldLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id='qualification'
                aria-invalid={fieldState.invalid}>
                <SelectValue placeholder='Select your qualification' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose your qualification</SelectLabel>
                </SelectGroup>
                {qualifications.map((qualification) => (
                  <SelectItem key={qualification} value={qualification}>
                    {capitalizeFirstLetter(qualification)}
                  </SelectItem>
                ))}
              </SelectContent>
              <FieldErrorMessageAndDescription
                error={fieldState.error}
                description='Select your qualification'
              />
            </Select>
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export const FieldDobAndGender = () => {
  const [open, setOpen] = useState(false);

  const form =
    useFormContext<
      Pick<CandidateProfileFormValues, 'dateOfBirth' | 'gender'>
    >();

  return (
    <FieldGroup className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
      <Controller
        name='dateOfBirth'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='date-of-birth'>Date Of Birth</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild aria-invalid={fieldState.invalid}>
                <Button
                  aria-invalid={fieldState.invalid}
                  variant='outline'
                  id='date'
                  className='w-48 justify-between font-normal'>
                  {field.value ? format(field.value, 'PPP') : 'Select date'}
                  <IconCalendarCheck />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='w-auto overflow-hidden p-0'
                align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  captionLayout='label'
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  disabled={(date) => date > new Date()}
                  className='rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]'
                  buttonVariant='ghost'
                />
              </PopoverContent>
            </Popover>

            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Select your date of birth'
            />
          </Field>
        )}
      />

      <Controller
        name='gender'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='gender'>Gender</FieldLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger id='gender' aria-invalid={fieldState.invalid}>
                <SelectValue placeholder='Select your gender' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose your gender</SelectLabel>
                </SelectGroup>
                {genders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {capitalizeFirstLetter(gender)}
                  </SelectItem>
                ))}
              </SelectContent>
              <FieldErrorMessageAndDescription
                error={fieldState.error}
                description='Select your gender'
              />
            </Select>
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export const FieldBiography = () => {
  const form = useFormContext<Pick<CandidateProfileFormValues, 'biography'>>();

  const biographyWatch = useWatch({
    control: form.control,
    name: 'biography',
    compute: (value) => (value.length <= 0 ? 0 : value.length),
  });

  return (
    <Controller
      name='biography'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='biography'>Biography</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id='biography'
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder='Write your biography here...'
              className='resize-none min-h-[120px]'
            />
            <InputGroupAddon align='block-end'>
              <InputGroupText className='text-muted-foreground text-[10px]'>
                {biographyWatch}/1000 characters left
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <FieldErrorMessageAndDescription
            error={fieldState.error}
            description='Write a short biography about yourself'
          />
        </Field>
      )}
    />
  );
};
