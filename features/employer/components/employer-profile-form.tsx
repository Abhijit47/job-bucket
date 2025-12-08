'use client';

// import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormPersist } from '@liorpo/react-hook-form-persist';
import { IconArrowBackUp, IconRestore, IconTrashX } from '@tabler/icons-react';
import { FileEdit } from 'lucide-react';
import { useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
  UpdateEmployerProfileInput,
  updateEmployerProfileSchema,
} from '@/lib/zodSchemas/employer.schema';
import Link from 'next/link';
import {
  useGetEmployerProfile,
  useUpdateEmployerProfile,
} from '../hooks/use-employers';
import {
  FieldEmailAndRole,
  FieldEmployerAvatar,
  FieldNameAndUserName,
  FieldPhoneNumberAndLocale,
} from './employer-profile-fields';

// const isDev = process.env.NODE_ENV === 'development';

export function EmployerProfileForm() {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const { data, isPending, isLoading } = useGetEmployerProfile();
  const { mutateAsync, isPending: isUpdatePending } =
    useUpdateEmployerProfile();

  const form = useForm<UpdateEmployerProfileInput>({
    resolver: zodResolver(updateEmployerProfileSchema),
    defaultValues: {
      name: data?.name || '',
      username: data?.username || '',
      phoneNumber: data?.phoneNumber || '',
      image: data?.image || '',
      locale: data?.locale || 'en-US',
      isActive: data?.isActive || false,
    },
    mode: 'onChange',
  });

  const { clear } = useFormPersist('employer-form', {
    control: form.control,
    setValue: form.setValue,
    storage: sessionStorage, // Use sessionStorage instead of localStorage
    // exclude: ["password", "confirmPassword"], // Don't persist passwords
    debounceDelay: 500, // Save after 500ms of inactivity
    timeout: 24 * 60 * 60 * 1000, // 24 hours
    onTimeout: () => {
      // console.log('Form data expired');
      toast.info('Saved employer form data has expired.');
    },
    validate: true, // Trigger validation when data is restored
    dirty: true, // Mark form as dirty
    touch: true, // Mark fields as touched
  });

  const onError: SubmitErrorHandler<UpdateEmployerProfileInput> = (errors) => {
    // console.log('Form errors:', errors);
    Object.values(errors).forEach((error) => {
      if (error.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit: SubmitHandler<UpdateEmployerProfileInput> = (data) => {
    mutateAsync(data, {
      onSuccess: () => {
        setIsAvailable(false);
      },
    });
  };

  return (
    <div className='w-full'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <Card>
            <CardHeader>
              <CardTitle>Update Profile Information</CardTitle>
              <CardDescription>
                Update your personal profile information below.
              </CardDescription>
              <CardAction className={'flex items-center gap-2'}>
                <Link
                  prefetch
                  href={'/employer/profile'}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                  })}>
                  <IconArrowBackUp className={'size-4'} />
                  Back to Profile
                </Link>
                <Button
                  disabled={isPending || isLoading}
                  variant='destructive'
                  type='button'
                  size='icon-sm'
                  onClick={() => clear()}>
                  <IconTrashX className='size-4' />
                </Button>
              </CardAction>
            </CardHeader>
            <Separator />
            <CardContent className={'space-y-4'}>
              <FieldNameAndUserName
                isAvailable={isAvailable}
                setIsAvailable={setIsAvailable}
              />

              <FieldEmailAndRole />

              <FieldPhoneNumberAndLocale />

              <FieldEmployerAvatar />
            </CardContent>
            <CardFooter>
              <FieldGroup className={'gap-4'}>
                <Field orientation='responsive'>
                  <Button
                    type='submit'
                    disabled={isUpdatePending || isPending || isLoading}>
                    {isUpdatePending ? (
                      <span className={'inline-flex items-center gap-2'}>
                        Updating...
                        <Spinner className='size-4' />
                      </span>
                    ) : (
                      <span className={'inline-flex items-center gap-2'}>
                        Update <FileEdit className={'size-4'} />
                      </span>
                    )}
                  </Button>
                  <Button
                    disabled={isUpdatePending || isPending || isLoading}
                    type='reset'
                    variant='outline'
                    onClick={() => form.reset()}>
                    Reset <IconRestore className='size-4' />
                  </Button>
                </Field>
              </FieldGroup>
            </CardFooter>
          </Card>
        </form>
        {/* {isDev ? <DevTool control={form.control} id='employer-form' /> : null} */}
      </FormProvider>
    </div>
  );
}
