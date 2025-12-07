import { ImageUpload } from '@/components/shared/image-upload';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
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
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import {
  industries,
  locales,
  organizationTypes,
  teamSizes,
} from '@/drizzle/db-constants';
import { authClient } from '@/lib/auth/client';
import { capitalizeFirstLetter, establishmentYears } from '@/lib/utils';
import { UpdateProfileInput } from '@/lib/zodSchemas/employer.schema';
import { IconCheck, IconHandClick } from '@tabler/icons-react';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useGetEmployerProfile } from '../hooks/use-employers';

type FieldNameAndUserNameProps = {
  isAvailable: boolean;
  setIsAvailable: Dispatch<SetStateAction<boolean>>;
};

export function FieldNameAndUserName(props: FieldNameAndUserNameProps) {
  const { isAvailable, setIsAvailable } = props;
  const [isPendingUsername, startUsernameTransition] = useTransition();

  const form = useFormContext<Pick<UpdateProfileInput, 'name' | 'username'>>();

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

  return (
    <FieldGroup className={'flex-row gap-4'}>
      <Controller
        name='name'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='name'>Name</FieldLabel>
              <Input
                id='name'
                placeholder='John Doe'
                autoComplete='name'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.error ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide name for identification
                </FieldDescription>
              )}
            </FieldContent>
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
            <FieldContent>
              <FieldLabel htmlFor='username'>Username</FieldLabel>
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
              {fieldState.error ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide a username for your profile
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />
    </FieldGroup>
  );
}

export function FieldEmailAndRole() {
  const { data } = useGetEmployerProfile();

  return (
    <FieldGroup className={'flex-row gap-4'}>
      <Field>
        <FieldContent>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input
            disabled
            id='email'
            placeholder='someone@example.com'
            autoComplete='off'
            defaultValue={data?.user?.email ?? 'N/A'}
            readOnly
          />
          <FieldDescription className={'text-xs'}>
            Email is not editable. Contact support to change it.
          </FieldDescription>
        </FieldContent>
      </Field>

      <Field>
        <FieldContent>
          <FieldLabel htmlFor='role'>Role</FieldLabel>
          <Input
            disabled
            id='role'
            placeholder='user'
            autoComplete='off'
            defaultValue={data?.user?.role ?? 'N/A'}
            readOnly
          />
          <FieldDescription className={'text-xs'}>
            Role is not editable.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}

export function FieldCompanyDescription() {
  const form = useFormContext<Pick<UpdateProfileInput, 'companyDescription'>>();

  const watchedValue = useWatch({
    control: form.control,
    compute: (data: Pick<UpdateProfileInput, 'companyDescription'>) => {
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

export function FieldPhoneNumberAndLocale() {
  const form =
    useFormContext<Pick<UpdateProfileInput, 'phoneNumber' | 'locale'>>();

  return (
    <FieldGroup className={'flex-row gap-4'}>
      <Controller
        name='phoneNumber'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='phoneNumber'>Phone number</FieldLabel>
              <Input
                id='phoneNumber'
                placeholder='+91 99999 11111'
                autoComplete='tel'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.error ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide your phone number
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name='locale'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='locale'>Preferred Locale</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className='w-full'
                  id='locale'
                  aria-invalid={fieldState.invalid}>
                  {field.value ? (
                    <SelectValue>{field.value}</SelectValue>
                  ) : (
                    <SelectValue id='locale' placeholder='Select a locale' />
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
              {fieldState.error ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide your preferred locale
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />
    </FieldGroup>
  );
}

export function FieldOrganizationAndIndustry() {
  const form =
    useFormContext<
      Pick<UpdateProfileInput, 'organizationType' | 'industryType'>
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
      Pick<UpdateProfileInput, 'teamSize' | 'yearOfEstablishment'>
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
              <Select defaultValue={field.value} onValueChange={field.onChange}>
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

export function FieldComapnyLogoAndBanner() {
  const form =
    useFormContext<
      Pick<UpdateProfileInput, 'companyLogoUrl' | 'companyBannerUrl'>
    >();

  const watchLogo = useWatch({
    control: form.control,
    name: 'companyLogoUrl',
  });

  const watchBanner = useWatch({
    control: form.control,
    name: 'companyBannerUrl',
  });

  return (
    <Card className={'p-2'}>
      <CardContent className={'p-2 space-y-4'}>
        <FieldSet className={'flex-row flex-wrap lg:flex-nowrap gap-4'}>
          <FieldGroup>
            <ImageUpload
              name='avatar'
              id='companyLogo'
              label='Company Logo'
              description='Provide company logo for identification'
            />
            <Field>
              <FieldContent>
                <FieldLabel htmlFor='companyLogoUrl'>
                  Company Logo URL
                </FieldLabel>
                <Input
                  id='companyLogoUrl'
                  placeholder='https://example.com'
                  autoComplete='off'
                  disabled
                  readOnly
                  defaultValue={watchLogo}
                />
                <FieldDescription className={'text-xs'}>
                  Provide your company logo URL
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>

          <FieldGroup>
            <ImageUpload
              name='banner'
              id='companyBanner'
              label='Company Banner'
              description='Provide company banner for identification'
            />
            <Field>
              <FieldContent>
                <FieldLabel htmlFor='companyBannerUrl'>
                  Company Banner URL
                </FieldLabel>
                <Input
                  id='companyBannerUrl'
                  placeholder='https://example.com'
                  autoComplete='off'
                  disabled
                  readOnly
                  defaultValue={watchBanner}
                />
                <FieldDescription className={'text-xs'}>
                  Provide your company banner URL
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}

export function FieldEmployerAvatar() {
  return (
    <ImageUpload
      name='avatar'
      id='image'
      label='Avatar'
      description='Provide avatar for identification'
    />
  );
}

export function FieldCompanyName() {
  const form = useFormContext<Pick<UpdateProfileInput, 'companyName'>>();
  return (
    <Controller
      name='companyName'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          // orientation='responsive'
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

export function FieldCompanyStreetAddressWebsite() {
  const form =
    useFormContext<
      Pick<UpdateProfileInput, 'streetAddress' | 'companyWebsite'>
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
                defaultValue={field.value}
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

export function FieldActiveProfile() {
  const form = useFormContext<Pick<UpdateProfileInput, 'isActive'>>();
  return (
    <Controller
      name='isActive'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          orientation='horizontal'
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor='activeProfile'>Active Profile</FieldLabel>
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
  );
}
