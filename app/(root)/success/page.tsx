import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

type PageProps = {
  params: Promise<{
    [key: string]: string | string[];
  }>;
  searchParams: Promise<{
    checkout_id?: string;
    customer_session_token?: string;
  }>;
};

export default async function SuccessPage(props: PageProps) {
  const searchParams = await props.searchParams;

  return (
    <section className={'py-24'}>
      <Card className={'max-w-[425px] mx-auto'}>
        <CardHeader>
          <div
            className={
              'p-2 bg-green-500/50 mx-auto flex items-center justify-center rounded-full'
            }>
            <CheckCircle className='mx-auto h-12 w-12 text-green-500' />
          </div>
          <CardTitle className={'space-y-4'}>
            <h1 className={'text-2xl font-semibold'}>
              Subscription Successful!
            </h1>
          </CardTitle>
          <CardDescription>
            <p className={'text-muted-foreground'}>
              Thank you for subscribing. Your payment has been processed
              successfully.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className='text-muted-foreground'>
            You can now access all premium features of our platform. We&apos;re
            excited to have you on board!
          </p>
        </CardContent>

        <Separator />
        <CardContent className={'text-xs space-y-2'}>
          <p>
            <span className={'text-base'}>Checkout ID: </span>
            <code className={'bg-accent px-1 py-0.5 rounded'}>
              {searchParams.checkout_id}
            </code>
          </p>

          <p>
            <span className={'text-base'}>Customer Session Token: </span>
            <code className={'bg-accent px-1 py-0.5 rounded'}>
              {searchParams.customer_session_token}
            </code>
          </p>
        </CardContent>

        <CardFooter>
          <Link
            href={'/'}
            prefetch={true}
            className={buttonVariants({
              variant: 'default',
              className: 'w-full',
            })}>
            Go back to home
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
