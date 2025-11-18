'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { establishmentYears } from '@/lib/utils';
import {
  locales,
  localeUnion,
  organizationTypes,
  organizationUnion,
  UpdateProfileInput,
  updateProfileSchema,
} from '@/lib/zodSchemas/employer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconRestore } from '@tabler/icons-react';
import { FileEdit } from 'lucide-react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { toast } from 'sonner';
import {
  useGetEmployerProfile,
  useUpdateEmployerProfile,
} from '../hooks/use-employers';

export function EmployerProfileForm() {
  const { data, isPending, isLoading } = useGetEmployerProfile();
  const { mutateAsync, isPending: isUpdatePending } =
    useUpdateEmployerProfile();

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      companyName: data?.employer.companyName || '',
      companyDescription: data?.employer.companyDescription || '',
      companyLogoUrl: data.employer.companyLogoUrl || '',
      companyBannerUrl: data.employer.companyBannerUrl || '',
      organizationType:
        (data.employer.organizationType as organizationUnion) || 'Partnership',
      teamSize: data.employer.teamSize || '',
      yearOfEstablishment: data.employer.yearOfEstablishment || '',
      companyWebsite: data.employer.companyWebsite || '',
      location: data.employer.location || '',

      name: data.user.name || '',
      // email: data.user.email || '',
      image: data.user.image || '',
      username: data.user.username || '',
      phoneNumber: data.user.phoneNumber || '',
      lang: (data.user.lang as localeUnion) || 'en-US',
    },
    mode: 'onChange',
  });

  const watchedValue = useWatch({
    control: form.control,
    compute: (data: UpdateProfileInput) => {
      if (data.companyDescription?.length)
        return data.companyDescription.length;

      return 0;
    },
  });

  const onError: SubmitErrorHandler<UpdateProfileInput> = (errors) => {
    // console.log('Form errors:', errors);
    Object.values(errors).forEach((error) => {
      if (error.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit: SubmitHandler<UpdateProfileInput> = (data) => {
    mutateAsync(data);
  };

  return (
    <div className='w-full'>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FieldSet disabled={isPending || isLoading}>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>Fill in your profile information.</FieldDescription>
          <FieldSeparator />
          <FieldGroup className={'gap-4'}>
            <Controller
              control={form.control}
              name='name'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='name'>Name</FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription>
                        Provide name for identification
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='name'
                    placeholder='John Doe'
                    autoComplete='name'
                    area-invalid={String(fieldState.invalid)}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Field orientation='responsive'>
              <FieldContent>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <FieldDescription className={'text-xs'}>
                  Email is not editable. Contact support to change it.
                </FieldDescription>
              </FieldContent>
              <Input
                disabled
                id='email'
                placeholder='someone@example.com'
                autoComplete='off'
                defaultValue={data.user.email}
                readOnly
              />
            </Field>
            <FieldSeparator />

            <Field orientation='responsive'>
              <FieldContent>
                <FieldLabel htmlFor='role'>Role</FieldLabel>
                <FieldDescription className={'text-xs'}>
                  Role is not editable.
                </FieldDescription>
              </FieldContent>
              <Input
                disabled
                id='role'
                placeholder='user'
                autoComplete='off'
                defaultValue={data.user.role ?? 'N/A'}
                readOnly
              />
            </Field>
            <FieldSeparator />

            <Controller
              control={form.control}
              name='image'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='image'>Avatar URL</FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Provide your avatar URL
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='image'
                    placeholder='https://example.com'
                    autoComplete='off'
                    area-invalid={String(fieldState.invalid)}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='phoneNumber'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='phoneNumber'>Phone number</FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription>
                        Provide your phone number
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='phoneNumber'
                    placeholder='+91 99999 11111'
                    autoComplete='tel'
                    area-invalid={String(fieldState.invalid)}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='lang'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='lang'>Preferred Locale</FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Provide your preferred locale
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='min-w-[200px]' id='lang'>
                      {field.value ? (
                        <SelectValue>{field.value}</SelectValue>
                      ) : (
                        <SelectValue id='lang' placeholder='Select a locale' />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Preffered Locale</SelectLabel>
                        {locales.map((type) => (
                          <SelectItem value={type} key={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='companyName'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='companyName'>Company Name</FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription>
                        Provide company name for identification
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='companyName'
                    placeholder='XYZ Company'
                    autoComplete='organization'
                    area-invalid={String(fieldState.invalid)}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='companyDescription'
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
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        You can write your company description here. Keep it
                        short, preferably under 2048 characters.
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Textarea
                    id='companyDescription'
                    placeholder='Hello, world!'
                    className='max-h-[100px] overflow-y-auto resize-none sm:min-w-[300px] md:min-w-[400px] w-full relative'
                    area-invalid={String(fieldState.invalid)}
                    {...field}
                  />
                  <Badge
                    variant={'outline'}
                    className={'text-[9px] absolute bottom-0.5 right-0.5'}>
                    {watchedValue}/2048
                  </Badge>
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='companyLogoUrl'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='companyLogoUrl'>
                      Company Logo
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Provide your company logo URL
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='companyLogoUrl'
                    placeholder='https://example.com'
                    autoComplete='off'
                    area-invalid={String(fieldState.invalid)}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='companyBannerUrl'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='companyBannerUrl'>
                      Company Banner
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Provide your company banner URL
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='companyBannerUrl'
                    placeholder='https://example.com'
                    autoComplete='off'
                    area-invalid={String(fieldState.invalid)}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='organizationType'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='organizationType'>
                      Organization Type
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Provide organization type for your company
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className='min-w-[200px]'
                      id='organizationType'>
                      {field.value ? (
                        <SelectValue>{field.value}</SelectValue>
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
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='teamSize'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='teamSize'>Team size</FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Provide the size of your team
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='min-w-[200px]' id='teamSize'>
                      {field.value ? (
                        <SelectValue>{field.value}</SelectValue>
                      ) : (
                        <SelectValue
                          id='teamSize'
                          placeholder='Select a size'
                        />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Team size</SelectLabel>
                        <SelectItem value='2-10'>2-10</SelectItem>
                        <SelectItem value='11-10'>11-50</SelectItem>
                        <SelectItem value='51-200'>51-200</SelectItem>
                        <SelectItem value='201-500'>201-500</SelectItem>
                        <SelectItem value='500+'>500+</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='yearOfEstablishment'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='yearOfEstablishment'>
                      Year of establishment
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Select your company&apos;s year of establishment
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className='min-w-[200px]'
                      id='yearOfEstablishment'>
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
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='companyWebsite'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='companyWebsite'>
                      Company Website
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Provide your company website URL
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='companyWebsite'
                    placeholder='https://example.com'
                    autoComplete='off'
                    area-invalid={String(fieldState.invalid)}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='location'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='location'>Location</FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Provide the location of your company
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='location'
                    placeholder='ex: Camac steet, Kolkata'
                    autoComplete='address-level1'
                    area-invalid={String(fieldState.invalid)}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Field orientation='responsive'>
              <Button type='submit'>
                {isUpdatePending ? (
                  <span className={'inline-flex items-center gap-2'}>
                    Updating...
                    <Spinner className='size-4' />
                  </span>
                ) : (
                  <span className={'inline-flex items-center gap-2'}>
                    Update Profile <FileEdit className={'size-4'} />
                  </span>
                )}
              </Button>
              <Button
                type='reset'
                variant='outline'
                onClick={() => form.reset()}>
                Cancel <IconRestore className='size-4' />
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
