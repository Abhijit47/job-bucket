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
import { Spinner } from '@/components/ui/spinner';
import { signIn } from '@/lib/auth/client';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const loginFormSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      await signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            router.push('/');
            form.reset();
            toast.success('Logged in successfully');
          },
          onError: ({ error }) => {
            toast.error(error.message || 'Login failed');
          },
        },
      });
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <Button type='submit' disabled={isPending}>
                    {isPending ? (
                      <span className={'inline-flex items-center gap-2'}>
                        Logging in... <Spinner />
                      </span>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button variant='outline' type='button' disabled={isPending}>
                    Login with Google
                  </Button>
                  <FieldDescription className='text-center'>
                    Don&apos;t have an account?{' '}
                    <Link href='/signup'>Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
