'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { signUp } from '@/lib/auth/client';
import { encodeRoleObject } from '@/lib/utils';
import {
  signUpFormSchema,
  SignUpFormValues,
} from '@/lib/zodSchemas/signup-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: undefined,
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = (data: SignUpFormValues) => {
    startTransition(async () => {
      await signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          query: { r: encodeRoleObject({ r: data.role }) },
          onSuccess: () => {
            router.push('/');
            toast.success('Sign-Up successfully!');
            form.reset();
          },
          onError: ({ error }) => {
            toast.error(error.message || 'Sign up failed');
          },
        }
      );
    });
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className={'space-y-4'}>
            <FieldGroup className={'gap-4'}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder='John Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        {...field}
                      />
                    </FormControl>
                    {!form.formState.errors.email?.message ? (
                      <FormDescription className={'text-xs'}>
                        We&apos;ll use this to contact you. We will not share
                        your email with anyone else.
                      </FormDescription>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
              <RoleSelect />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          aria-invalid={!!form.formState.errors.password}
                          id={field.name}
                          placeholder='******'
                          type={isVisible ? 'text' : 'password'}
                          {...field}
                        />
                        <InputGroupAddon align='inline-end'>
                          <InputGroupButton
                            type='button'
                            onClick={toggleVisibility}
                            aria-label={
                              isVisible ? 'Hide password' : 'Show password'
                            }
                            aria-pressed={isVisible}
                            aria-controls='password'>
                            {isVisible ? (
                              <EyeOffIcon size={16} aria-hidden='true' />
                            ) : (
                              <EyeIcon size={16} aria-hidden='true' />
                            )}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    {!form.formState.errors.password?.message ? (
                      <FormDescription className={'text-xs'}>
                        Must be at least 8 characters long.
                      </FormDescription>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          aria-invalid={!!form.formState.errors.password}
                          id={field.name}
                          placeholder='******'
                          type={isVisible ? 'text' : 'password'}
                          {...field}
                        />
                        <InputGroupAddon align='inline-end'>
                          <InputGroupButton
                            type='button'
                            onClick={toggleVisibility}
                            aria-label={
                              isVisible ? 'Hide password' : 'Show password'
                            }
                            aria-pressed={isVisible}
                            aria-controls='password'>
                            {isVisible ? (
                              <EyeOffIcon size={16} aria-hidden='true' />
                            ) : (
                              <EyeIcon size={16} aria-hidden='true' />
                            )}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    {!form.formState.errors.confirmPassword?.message ? (
                      <FormDescription className={'text-xs'}>
                        Please confirm your password.
                      </FormDescription>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Field>
                <Button type='submit' disabled={isPending}>
                  {isPending ? (
                    <span className={'inline-flex items-center gap-2'}>
                      Creating Account... <Spinner />
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </Button>
                <Button variant='outline' type='button'>
                  Sign up with Google
                </Button>
                <FieldDescription className='px-6 text-center'>
                  Already have an account? <Link href='/login'>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function RoleSelect() {
  const form = useFormContext<Pick<SignUpFormValues, 'role'>>();

  return (
    <FormField
      control={form.control}
      name='role'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Choose an approprieate role' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value='candidate'>Candidate</SelectItem>
                  <SelectItem value='employer'>Employer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          {!form.formState.errors.role?.message ? (
            <FormDescription className={'text-xs'}>
              Must be at least 8 characters long.
            </FormDescription>
          ) : (
            <FormMessage />
          )}
        </FormItem>
      )}
    />
  );
}
