import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';
import { caller } from '@/trpc/server';
import { ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';

const fallback =
  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80';

export default async function EmployerProfile() {
  await withEmployerAuth();

  const profile = await caller.employers.myProfile();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className='text-2xl font-bold'>Employer Profile Page</h1>
          </CardTitle>
          <CardDescription>
            Here you can view and edit your employer profile information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={'grid grid-cols-4 gap-4 items-center'}>
            <div
              className={
                'col-span-3 aspect-video md:aspect-18/9 lg:aspect-30/9 w-full h-full'
              }>
              {/* <Image
              src='https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
              alt='Photo by Drew Beamer'
              fill
              className='h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale'
            /> */}
              <Image
                src={profile.employer.companyBannerUrl || fallback}
                alt='Company Banner'
                width={1200}
                height={300}
                className='rounded-md w-full h-full object-cover'
              />
            </div>
            <div className='col-span-1 w-full'>
              <Image
                src={profile.employer.companyLogoUrl || fallback}
                alt='Company Logo'
                width={150}
                height={150}
                className='rounded-full w-full h-full object-cover'
              />
            </div>
            <Image
              src={profile.user.image}
              alt='Employer Profile Image'
              width={150}
              height={150}
              className='rounded-full w-full h-full object-cover'
            />
          </div>
        </CardContent>

        <CardContent>
          <Collapsible className={'space-y-2'}>
            <div className='flex items-center justify-between gap-4 px-4'>
              <h1 className='text-2xl font-bold'>User Infomation</h1>
              <CollapsibleTrigger asChild>
                <Button variant='ghost' size='icon' className='size-8'>
                  <ChevronsUpDown />
                  <span className='sr-only'>Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className={'space-y-2'}>
              <p className='rounded-md border px-4 py-2 font-mono text-sm'>
                Name: {profile.user.name}
              </p>
              <p className='rounded-md border px-4 py-2 font-mono text-sm'>
                Username: {profile.user.username}
              </p>
              <p className='rounded-md border px-4 py-2 font-mono text-sm'>
                Email: {profile.user.email}
              </p>
              <p className='rounded-md border px-4 py-2 font-mono text-sm'>
                Preferred Locale: {profile.user.lang}
              </p>
              <p className='rounded-md border px-4 py-2 font-mono text-sm'>
                Phone Number: {profile.user.phoneNumber}
              </p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}
