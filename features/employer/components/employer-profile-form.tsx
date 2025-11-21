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
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
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
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { authClient } from '@/lib/auth/client';
import { establishmentYears } from '@/lib/utils';
import {
  UpdateProfileInput,
  updateProfileSchema,
} from '@/lib/zodSchemas/employer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCheck, IconHandClick, IconRestore } from '@tabler/icons-react';
import { FileEdit } from 'lucide-react';
import { useState, useTransition } from 'react';
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

import { locales, organizationTypes } from '@/drizzle/db-constants';

export function EmployerProfileForm() {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isPendingUsername, startUsernameTransition] = useTransition();

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
      organizationType: data.employer.organizationType || 'Partnership',
      teamSize: data.employer.teamSize || '',
      yearOfEstablishment: data.employer.yearOfEstablishment || '',
      companyWebsite: data.employer.companyWebsite || '',
      location: data.employer.location || '',
      name: data.user.name || '',
      username: data.user.username || '',
      phoneNumber: data.user.phoneNumber || '',
      image: data.user.image || '',
      locale: data.user.locale || 'en-US',
      isActive: data.user.isActive || false,
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

  const handleCheckUserName = (username: string) => {
    if (!username) {
      form.setError('username', {
        type: 'manual',
        message: 'Username cannot be empty',
      });
      setIsAvailable(false);
      return;
    }
    startUsernameTransition(async () => {
      const { data: response, error } = await authClient.isUsernameAvailable({
        username: username,
      });

      if (response?.available) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
        form.setError('username', {
          type: 'manual',
          message: error?.message || 'Username is not available',
        });
      }
    });
  };

  const onError: SubmitErrorHandler<UpdateProfileInput> = (errors) => {
    // console.log('Form errors:', errors);
    Object.values(errors).forEach((error) => {
      if (error.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit: SubmitHandler<UpdateProfileInput> = (data) => {
    mutateAsync(data, {
      onSuccess: () => {
        setIsAvailable(false);
      },
    });
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
                      <FieldDescription className={'text-xs'}>
                        Provide name for identification
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='name'
                    placeholder='John Doe'
                    autoComplete='name'
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='username'
              render={({ field, fieldState }) => (
                <Field
                  orientation='responsive'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='username'>Username</FieldLabel>
                    {fieldState.error ? (
                      <FieldError
                        className={'text-xs'}
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className={'text-xs'}>
                        Provide a username for your profile
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      id='username'
                      placeholder='johndoe07'
                      autoComplete='off'
                      aria-invalid={fieldState.invalid}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setIsAvailable(false);
                      }}
                    />
                    <InputGroupAddon align='inline-end'>
                      <InputGroupButton
                        type='button'
                        aria-invalid={fieldState.invalid}
                        aria-label='Check username'
                        title='Check username'
                        size='icon-xs'
                        variant={
                          isPendingUsername
                            ? 'secondary'
                            : isAvailable
                            ? 'default'
                            : 'outline'
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          handleCheckUserName(field.value);
                        }}>
                        {isPendingUsername ? (
                          <Spinner className='size-4' />
                        ) : isAvailable ? (
                          <IconCheck className='size-4' />
                        ) : (
                          <IconHandClick className='size-4' />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
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
                defaultValue={data?.user?.email ?? 'N/A'}
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
                defaultValue={data?.user?.role ?? 'N/A'}
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
                    aria-invalid={fieldState.invalid}
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
                      <FieldDescription className={'text-xs'}>
                        Provide your phone number
                      </FieldDescription>
                    )}
                  </FieldContent>
                  <Input
                    id='phoneNumber'
                    placeholder='+91 99999 11111'
                    autoComplete='tel'
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='locale'
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
                    <SelectTrigger
                      className='min-w-[200px]'
                      id='lang'
                      aria-invalid={fieldState.invalid}>
                      {field.value ? (
                        <SelectValue>{field.value}</SelectValue>
                      ) : (
                        <SelectValue id='lang' placeholder='Select a locale' />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Preferred Locale</SelectLabel>
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
                    aria-invalid={fieldState.invalid}
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
                    aria-invalid={fieldState.invalid}
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
                    aria-invalid={fieldState.invalid}
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
                    aria-invalid={fieldState.invalid}
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
                      id='organizationType'
                      aria-invalid={fieldState.invalid}>
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
                    <SelectTrigger
                      className='min-w-[200px]'
                      id='teamSize'
                      aria-invalid={fieldState.invalid}>
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
                    aria-invalid={fieldState.invalid}
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
                    placeholder='ex: Camac street, Kolkata'
                    autoComplete='address-level1'
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </Field>
              )}
            />
            <FieldSeparator />

            <Controller
              control={form.control}
              name='isActive'
              render={({ field, fieldState }) => (
                <Field
                  orientation='horizontal'
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor='activeProfile'>
                      Active Profile
                    </FieldLabel>
                    <FieldDescription>
                      Toggle to activate or deactivate your employer profile.
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id='activeProfile'
                    aria-invalid={fieldState.invalid}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Field>
              )}
            />

            <Field orientation='responsive'>
              <Button type='submit' disabled={isUpdatePending}>
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
                disabled={isUpdatePending}
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
