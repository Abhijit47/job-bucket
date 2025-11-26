'use client';

import {
  BriefcaseBusiness,
  ChevronDownIcon,
  FigmaIcon,
  LucideGlasses,
  LucideMapPin,
  MapPinCheck,
  ReceiptIndianRupeeIcon,
  Rocket,
  Users2Icon,
  XIcon,
} from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '../ui/input-group';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../ui/item';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';

export default function HeroSection() {
  const heroSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <section
      className={
        'rounded-b-2xl space-y-4 pt-16 bg-linear-to-b from-cyan-200 dark:from-cyan-500 to-blue-300 dark:to-blue-500'
      }>
      <div className={'text-center space-y-2'}>
        <Badge className={'text-xs lg:text-sm px-3'}>
          <span className={'inline-flex items-center gap-1'}>
            <Users2Icon className={'size-3 rounded-lg'} />
            <Users2Icon className={'size-3 rounded-lg'} />
            <Users2Icon className={'size-3 rounded-lg'} />
          </span>
          And <strong>2,382</strong> users have already signed up
        </Badge>
        <h1
          className={
            'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold md:font-bold leading-tight'
          }>
          <span className={'block'}>Unlock Limitless Career</span>
          <span className={'block'}>Possibilities Today</span>
        </h1>
        <p
          className={
            'text-muted-foreground dark:text-background text-sm sm:text-base lg:text-lg xl:text-xl lg:leading-7'
          }>
          Find new opportunities, gain valuable experience, and build your
          future with us.
        </p>
      </div>

      <form
        onSubmit={heroSearch}
        className={
          'rounded-full max-w-fit md:max-w-lg mx-auto ring-1 ring-primary/50 h-12 flex items-center'
        }>
        <InputGroup
          className={
            'rounded-full! h-full w-full border-none! bg-background! dark:bg-background!'
          }>
          <InputGroupText className={'px-2'}>
            <LucideGlasses className={'size-4'} />
          </InputGroupText>
          <InputGroupInput placeholder='Job title or keywords' />
          <Separator orientation='vertical' />
          <InputGroupText className={'px-2'}>
            <LucideMapPin className={'size-4'} />
          </InputGroupText>
          <InputGroupInput placeholder='City or country' />

          <InputGroupAddon align={'inline-end'}>
            <Button
              type='submit'
              size={'lg'}
              variant={'secondary'}
              className={
                'rounded-full bg-foreground hover:bg-background text-muted hover:text-muted-foreground ring-1 hover:ring-muted-foreground transition-colors ease-in-out'
              }>
              Find jobs
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </form>

      <div className={'grid items-start grid-cols-1 lg:grid-cols-3 pt-12'}>
        <MonitorStatusCard />

        <Card className={'max-w-[400px] mx-auto w-full p-4 gap-3 ml-auto'}>
          <CardHeader className={'px-0'}>
            <CardTitle className={'mt-3'}>
              <h3>Job Details</h3>
            </CardTitle>
            <CardAction>
              <Button
                size={'icon-lg'}
                variant={'outline'}
                className={'rounded-full'}>
                <XIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className={'px-0'}>
            <Item variant='outline' size='sm' className={'p-1'}>
              <ItemMedia variant={'image'} className={'p-0.5'}>
                <Image
                  src='/react.svg'
                  alt='job-logo'
                  width={32}
                  height={32}
                  className={'w-full h-full p-1 object-contain'}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <h3 className={'font-semibold text-base'}>
                    Frontend Developer
                  </h3>
                </ItemTitle>
                <ItemDescription>Pulse Tech</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ItemDescription className={'text-xs'}>
                  Posted 1 min ago
                </ItemDescription>
              </ItemActions>
            </Item>
          </CardContent>
          <Separator />

          <CardContent className={'px-0 space-y-2'}>
            <CardTitle>
              <h3>About the Job</h3>
            </CardTitle>
            <CardDescription>
              <p>
                Pulse Tech is a leading innovator in cutting-edge technology
                solutions, dedicated to creating seamless digital experiences.
              </p>
            </CardDescription>
            <CardAction className={'justify-self-start'}>
              <Button size={'sm'} variant={'link'} className={'px-0'}>
                Read more
              </Button>
            </CardAction>
          </CardContent>

          <CardContent className={'px-0 flex flex-wrap gap-4'}>
            <Badge variant={'outline'}>
              <MapPinCheck className={'size-4'} /> San Francisco
            </Badge>
            <Badge variant={'outline'}>
              <BriefcaseBusiness className={'size-4'} /> Full-Time
            </Badge>
            <Badge variant={'outline'}>
              <ReceiptIndianRupeeIcon className={'size-4'} /> ₹70,000 - ₹90,000
            </Badge>
          </CardContent>
        </Card>

        <div className={'hidden lg:block h-full w-full relative'}>
          <Card
            className={
              'p-0 rounded-2xl absolute top-4 lg:right-5/12 xl:right-6/12 lg:-translate-x-6 xl:-translate-x-12 lg:-translate-y-8 xl:-translate-y-8'
            }>
            <Item variant='outline' size='sm' className={'p-2 border-none'}>
              <ItemMedia variant={'icon'} className={'rounded-full bg-primary'}>
                <FigmaIcon className='size-5 stroke-primary-foreground' />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <h3 className={'text-lg font-semibold'}>UI Designer</h3>
                </ItemTitle>
                <ItemDescription>1,392 results</ItemDescription>
              </ItemContent>
            </Item>
          </Card>
          <Card
            className={
              'p-0 rounded-2xl absolute lg:bottom-20 xl:bottom-4 lg:right-5/12 xl:right-6/12 lg:-translate-x-6/12 xl:-translate-x-8/12 lg:-translate-y-16 xl:-translate-y-20 -rotate-6'
            }>
            <Item variant='outline' size='sm' className={'p-2 border-none'}>
              <ItemMedia variant={'icon'} className={'rounded-full bg-primary'}>
                <Rocket className='size-5 stroke-primary-foreground' />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <h3 className={'text-xl font-semibold'}>90%</h3>
                </ItemTitle>
                <ItemDescription>Hiring rate</ItemDescription>
              </ItemContent>
            </Item>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function MonitorStatusCard() {
  return (
    <Card
      className={
        'hidden lg:block max-w-[300px] mx-auto w-full p-4 gap-3 lg:rotate-6'
      }>
      <CardHeader className={'px-0'}>
        <CardTitle className={'h-full'}>
          <h3 className={'mt-2'}>Your Stats</h3>
        </CardTitle>
        <CardAction>
          <Badge variant={'outline'}>
            Last 7 days
            <ChevronDownIcon />
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className={'space-y-4 px-0'}>
        <Item variant='muted' size='sm' className={'p-0'}>
          <ItemContent className={'px-0 w-full'}>
            <Progress
              className={'h-6 rounded-lg w-full'}
              value={65}
              max={100}
            />
          </ItemContent>
          <ItemActions>
            <span className={'font-semibold text-xs'}>12</span> sent
          </ItemActions>
        </Item>
        <Item variant='muted' size='sm' className={'p-0'}>
          <ItemContent className={'px-0 w-full'}>
            <Progress
              className={'h-6 rounded-lg w-full'}
              value={85}
              max={100}
            />
          </ItemContent>
          <ItemActions>
            <span className={'font-semibold text-xs'}>6</span> viewed
          </ItemActions>
        </Item>
        <Item variant='muted' size='sm' className={'p-0'}>
          <ItemContent className={'px-0 w-full'}>
            <Progress
              className={'h-6 rounded-lg w-full'}
              value={55}
              max={100}
            />
          </ItemContent>
          <ItemActions>
            <span className={'font-semibold text-xs'}>4</span> called
          </ItemActions>
        </Item>
      </CardContent>
      <CardFooter className={'px-0 gap-2'}>
        <span className={'inline-flex items-center gap-2 px-1'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-dot size-10 stroke-primary'
            aria-hidden='true'>
            <circle cx='12.1' cy='12.1' r='1'></circle>
          </svg>
          <span>Normal</span>
        </span>
        <span className={'inline-flex items-center gap-2 px-1'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-dot size-10 stroke-primary/50'
            aria-hidden='true'>
            <circle cx='12.1' cy='12.1' r='1'></circle>
          </svg>
          <span>Boosted</span>
        </span>
      </CardFooter>
    </Card>
  );
}

export function CompanyInfo() {
  return (
    <Item variant='outline' size='sm' className={'p-1'}>
      <ItemMedia variant={'image'} className={'p-0.5'}>
        <Image
          src='/react.svg'
          alt='job-logo'
          width={32}
          height={32}
          className={'w-full h-full p-1 object-contain'}
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <h3 className={'font-semibold text-base'}>Frontend Developer</h3>
        </ItemTitle>
        <ItemDescription>Pulse Tech</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ItemDescription className={'text-xs'}>
          Posted 1 min ago
        </ItemDescription>
      </ItemActions>
    </Item>
  );
}

export function JobCard() {
  return;
}
