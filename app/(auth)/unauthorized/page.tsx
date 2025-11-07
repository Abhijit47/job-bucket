import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';

export default function UnAuthorizedPage() {
  return (
    <div className={'h-dvh flex items-center justify-center'}>
      <Card className='w-[425px]'>
        <CardHeader>
          <CardTitle>
            <h1
              className={
                'inline-flex flex-col items-center justify-center gap-4 text-lg font-bold text-center'
              }>
              <span className={'bg-destructive/20 p-4 rounded-full'}>
                <TriangleAlert className={'stroke-destructive size-8'} />
              </span>
              <span>You are not authorized to access this page.</span>
            </h1>
          </CardTitle>
          <CardDescription>
            <p className={'text-center'}>
              Please contact the administrator if you believe this is an error.
            </p>
          </CardDescription>
          <Separator />
          <CardFooter className={'w-full'}>
            <Link
              href={'/'}
              className={buttonVariants({
                variant: 'default',
                className: 'w-full',
              })}>
              Go to Home
            </Link>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
