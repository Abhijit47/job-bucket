import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';
import { IconPencilPlus } from '@tabler/icons-react';
import Link from 'next/link';

export default async function CompanyProfilePage() {
  await withEmployerAuth();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className='text-2xl font-bold'>Company Profile</h1>
          </CardTitle>
          <CardDescription>
            Here you can view your company profile information.
          </CardDescription>

          <CardAction>
            <Link
              prefetch
              href={'/employer/company-profile/update'}
              className={buttonVariants({
                variant: 'link',
                size: 'sm',
              })}>
              <IconPencilPlus className={'size-4'} />
              Update Profile
            </Link>
          </CardAction>
        </CardHeader>

        <Separator />

        <CardContent>COMPANY DETAILS</CardContent>
      </Card>
    </div>
  );
}
