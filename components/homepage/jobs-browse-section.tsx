import {
  BarChart2,
  BookmarkIcon,
  BriefcaseBusiness,
  CircleQuestionMarkIcon,
  Code2,
  MapPinCheck,
  PaletteIcon,
  ReceiptIndianRupeeIcon,
  Share2Icon,
  ShoppingBagIcon,
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
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../ui/item';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type Job = {
  id: string;
  title: string;
  description: string;
  companyName: string;
  logo: string;
  location: string;
  workType: string;
  salary: string;
  createdAt: string;
};

export const jobs: Job[] = [
  {
    id: crypto.randomUUID(),
    title: 'UI Designer',
    description: `Design visually appealing and user-friendly interfaces for web
        and mobile applications. Collaborate with cross-functional
        teams to create intuitive layouts, implement design systems...`,
    companyName: 'Pulse Tech',
    logo: '/react.svg',
    location: 'San Francisco, USA',
    workType: 'Full-Time',
    salary: '₹70,000 - ₹90,000',
    createdAt: 'Posted 1 min ago',
  },
  {
    id: crypto.randomUUID(),
    title: 'Senior UX Researcher',
    description: `Lead user research initiatives to gather insights that drive
design decisions. Conduct usability testing, interviews, and
data analysis to improve product experiences.`,
    companyName: 'Designlabz',
    logo: '/react.svg',
    location: 'New York, USA',
    workType: 'Full-Time',
    salary: '₹85,000 - ₹120,000',
    createdAt: 'Posted 3 min ago',
  },
  {
    id: crypto.randomUUID(),
    title: 'UI/UX Designer',
    description: `Collaborate with product teams to design intuitive user
interfaces and enhance user experience. Responsibilities
include wireframing, prototyping, and usability testing for m...`,
    companyName: 'Pulse Tech',
    logo: '/react.svg',
    location: 'San Francisco, USA',
    workType: 'Full-Time',
    salary: '₹70,000 - ₹95,000',
    createdAt: 'Posted 5 min ago',
  },
  {
    id: crypto.randomUUID(),
    title: 'UI/UX Manager',
    description: `Oversee a team of designers to deliver high-quality user
experiences across multiple products. Lead design strategy,
ensure consistency, and mentor junior designers...`,
    companyName: 'Designlabz',
    logo: '/react.svg',
    location: 'San Francisco, USA',
    workType: 'Full-Time',
    salary: '₹110,000 - ₹140,000',
    createdAt: 'Posted 10 min ago',
  },
  {
    id: crypto.randomUUID(),
    title: 'UX/UI Design Intern',
    description: `Assist in designing and prototyping user interfaces for
websites and mobile apps. Gain hands-on experience with
design tools and contribute to real-world projects....`,
    companyName: 'Pulse Tech',
    logo: '/react.svg',
    location: 'San Francisco, USA',
    workType: 'Intern',
    salary: '₹2000 - ₹2500 per hour',
    createdAt: 'Posted yestarday',
  },
  {
    id: crypto.randomUUID(),
    title: 'Product Designer',
    description: `Create seamless design solutions for complex software
products. Collaborate with engineers and stakeholders to
ensure a user-centered approach to product development...`,
    companyName: 'InnovateSoft',
    logo: '/react.svg',
    location: 'San Francisco, USA',
    workType: 'Remote',
    salary: '₹80,000 - ₹110,000',
    createdAt: 'Posted yestarday',
  },
];

export default function JobsBrowseSection() {
  return (
    <section className={'max-w-[85em] mx-auto'}>
      <Card className={'rounded-none border-none shadow-none bg-transparent'}>
        <CardHeader className={'text-center'}>
          <CardDescription>BROWSE</CardDescription>
          <CardTitle>
            <h2 className={'text-4xl font-medium'}>
              <span className={'block'}>Browse Through Our</span>{' '}
              <span className={'block'}>Latest Job Listings</span>
            </h2>
          </CardTitle>
        </CardHeader>

        <CardContent className={'px-0'}>
          <Tabs defaultValue='ui-ux-design' className={'gap-6'}>
            <ScrollArea className='h-fit max-w-2xl mx-auto w-full'>
              <TabsList className='md:h-10 lg:h-12 bg-transparent flex items-center justify-center gap-2'>
                <TabsTrigger
                  value='ui-ux-design'
                  asChild
                  className={
                    'data-[state=inactive]:bg-muted-foreground/5! data-[state=inactive]:text-muted-foreground! ring-1! data-[state=active]:bg-foreground!'
                  }>
                  <Button
                    size={'lg'}
                    variant={'secondary'}
                    className={
                      'rounded-full! p-4 text-background! font-semibold'
                    }>
                    <PaletteIcon className={'size-4'} />
                    UI/UX Design
                  </Button>
                </TabsTrigger>
                <TabsTrigger
                  value='development'
                  asChild
                  className={
                    'data-[state=inactive]:bg-muted-foreground/5! data-[state=inactive]:text-muted-foreground! ring-1! data-[state=active]:bg-foreground!'
                  }>
                  <Button
                    size={'lg'}
                    variant={'secondary'}
                    className={
                      'rounded-full! p-4 text-background! font-semibold'
                    }>
                    <Code2 className={'size-4'} />
                    Development
                  </Button>
                </TabsTrigger>
                <TabsTrigger
                  value='data-analyst'
                  asChild
                  className={
                    'data-[state=inactive]:bg-muted-foreground/5! data-[state=inactive]:text-muted-foreground! ring-1! data-[state=active]:bg-foreground!'
                  }>
                  <Button
                    size={'lg'}
                    variant={'secondary'}
                    className={
                      'rounded-full! p-4 text-background! font-semibold'
                    }>
                    <BarChart2 className={'size-4'} /> Data Analyst
                  </Button>
                </TabsTrigger>
                <TabsTrigger
                  value='sales'
                  asChild
                  className={
                    'data-[state=inactive]:bg-muted-foreground/5! data-[state=inactive]:text-muted-foreground! ring-1! data-[state=active]:bg-foreground!'
                  }>
                  <Button
                    size={'lg'}
                    variant={'secondary'}
                    className={
                      'rounded-full! p-4 text-background! font-semibold'
                    }>
                    <ShoppingBagIcon className={'size-4'} />
                    Sales
                  </Button>
                </TabsTrigger>
                <TabsTrigger
                  value='other'
                  asChild
                  className={
                    'data-[state=inactive]:bg-muted-foreground/5! data-[state=inactive]:text-muted-foreground! ring-1! data-[state=active]:bg-foreground!'
                  }>
                  <Button
                    size={'lg'}
                    variant={'secondary'}
                    className={
                      'rounded-full! p-4 text-background! font-semibold'
                    }>
                    <CircleQuestionMarkIcon className={'size-4'} />
                    Other
                  </Button>
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>

            <TabsContent value='ui-ux-design' className=''>
              <JobsCard jobs={jobs} />
            </TabsContent>

            <TabsContent value='development' className=''>
              <JobsCard jobs={jobs.reverse()} />
            </TabsContent>

            <TabsContent value='data-analyst' className=''>
              <JobsCard jobs={jobs.reverse()} />
            </TabsContent>

            <TabsContent value='sales' className=''>
              <JobsCard jobs={jobs.reverse()} />
            </TabsContent>

            <TabsContent value='other' className=''>
              <JobsCard jobs={jobs.reverse()} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}

function JobsCard({ jobs }: { jobs: Job[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {jobs.map((job) => (
        <Card key={job.id} className={'py-4 gap-3'}>
          <CardHeader className={''}>
            <Item variant='outline' size='sm' className={'border-none!'}>
              <ItemMedia
                variant={'image'}
                className={'p-0.5 ring-1 rounded-full'}>
                <Image
                  src={job.logo}
                  alt='job-logo'
                  width={32}
                  height={32}
                  className={'w-full h-full object-contain!'}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <h3 className={'font-semibold text-base'}>{job.title}</h3>
                </ItemTitle>
                <ItemDescription>{job.companyName}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ItemDescription
                  className={'text-xs underline underline-offset-3'}>
                  {job.createdAt}
                </ItemDescription>
              </ItemActions>
            </Item>
          </CardHeader>

          <Separator />

          <CardContent className={'space-y-2'}>
            <CardTitle>
              <h3>About the Job</h3>
            </CardTitle>
            <CardDescription>
              <p>{job.description}</p>
            </CardDescription>
            <CardAction className={'justify-self-start'}>
              <Button size={'sm'} variant={'link'} className={'px-0'}>
                Read more
              </Button>
            </CardAction>
          </CardContent>

          <CardContent className={'flex flex-wrap gap-2'}>
            <Badge
              variant={'outline'}
              className={'bg-muted-foreground/5 text-sm px-3'}>
              <MapPinCheck className={'size-4'} /> {job.location}
            </Badge>
            <Badge
              variant={'outline'}
              className={'bg-muted-foreground/5 text-sm px-3'}>
              <BriefcaseBusiness className={'size-4'} /> {job.workType}
            </Badge>
            <Badge
              variant={'outline'}
              className={'bg-muted-foreground/5 text-sm px-3'}>
              <ReceiptIndianRupeeIcon className={'size-4'} /> {job.salary}
            </Badge>
          </CardContent>

          <CardFooter className={'gap-4 mt-auto'}>
            <Button
              size={'lg'}
              variant={'outline'}
              className={
                'flex-1 bg-foreground! hover:bg-background! text-background! hover:text-foreground! rounded-full'
              }>
              Apply Now
            </Button>

            <CardAction className={'flex items-center gap-2'}>
              <Button
                size={'icon-lg'}
                variant={'outline'}
                className={'rounded-full'}>
                <BookmarkIcon className={'size-4'} />
              </Button>
              <Button
                size={'icon-lg'}
                variant={'outline'}
                className={'rounded-full'}>
                <Share2Icon className={'size-4'} />
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
