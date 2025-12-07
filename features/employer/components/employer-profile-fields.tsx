import { IconCheck, IconHandClick } from '@tabler/icons-react';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

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
import { locales } from '@/drizzle/db-constants';
import { authClient } from '@/lib/auth/client';
import { UpdateEmployerProfileInput } from '@/lib/zodSchemas/employer.schema';
import { useGetEmployerProfile } from '../hooks/use-employers';
import UploadImage from './upload-image';

type FieldNameAndUserNameProps = {
  isAvailable: boolean;
  setIsAvailable: Dispatch<SetStateAction<boolean>>;
};

export function FieldNameAndUserName(props: FieldNameAndUserNameProps) {
  const { isAvailable, setIsAvailable } = props;
  const [isPendingUsername, startUsernameTransition] = useTransition();

  const form =
    useFormContext<Pick<UpdateEmployerProfileInput, 'name' | 'username'>>();

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
            defaultValue={data?.email ?? 'N/A'}
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
            defaultValue={data?.role ?? 'N/A'}
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

export function FieldPhoneNumberAndLocale() {
  const form =
    useFormContext<
      Pick<UpdateEmployerProfileInput, 'phoneNumber' | 'locale'>
    >();

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

export function FieldActiveProfile() {
  const form = useFormContext<Pick<UpdateEmployerProfileInput, 'isActive'>>();
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

export function FieldEmployerAvatar() {
  const form = useFormContext<Pick<UpdateEmployerProfileInput, 'image'>>();

  return (
    <>
      <Controller
        name='image'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor='image'>Avatar URL</FieldLabel>
              <Input
                id='image'
                placeholder='https://example.com'
                autoComplete='off'
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error?.message ? (
                <FieldError className={'text-xs'} errors={[fieldState.error]} />
              ) : (
                <FieldDescription className={'text-xs'}>
                  Provide your avatar URL
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}
      />

      <UploadImage maxFiles={1} />
    </>
  );
}
