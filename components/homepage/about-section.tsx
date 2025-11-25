import {
  ArrowDownRightFromCircle,
  CheckCircle2,
  CircleArrowOutDownRightIcon,
  DotSquareIcon,
  type Icon as LucideIcon,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

type AboutStat = {
  title: string;
  description: string;
  badgeText: string | null;
  icon: typeof LucideIcon | null;
};

export const aboutStats: AboutStat[] = [
  {
    title: '10K+',
    description: '<strong>Job seekers</strong> placed in their dream roles.',
    badgeText: 'Achievement',
    icon: null,
  },
  {
    title: '5K+',
    description: '<strong>Companies trust Jobweez</strong> to find top talent.',
    badgeText: 'Trust',
    icon: null,
  },
  {
    title: '20+',
    description:
      '<strong>Industries covered</strong>, from tech to healthcare.',
    badgeText: 'Diversity',
    icon: null,
  },
  {
    title: 'See other statistics',
    description:
      '<strong>Industries covered</strong>, from tech to healthcare.',
    badgeText: null,
    icon: ArrowDownRightFromCircle,
  },
];

export default function AboutSection() {
  return (
    <section className={'max-w-[85em] mx-auto'}>
      <div className={'grid grid-cols-1 lg:grid-cols-2 py-12 gap-6'}>
        <Card className={'rounded-none border-none shadow-none bg-transparent'}>
          <CardHeader className={'space-y-6'}>
            <CardDescription>
              <p className={'inline-flex items-center gap-2 text-xl'}>
                <span>
                  <DotSquareIcon />
                </span>
                ABOUT US
              </p>
            </CardDescription>
            <CardTitle>
              <h2 className={'text-4xl font-medium leading-10'}>
                <span className={'font-bold'}>We connects job seekers</span>{' '}
                with opportunities that match their skills and passions.
              </h2>
            </CardTitle>
          </CardHeader>

          <CardFooter className={'items-start mt-auto'}>
            <div className={'inline-flex items-center flex-wrap gap-4'}>
              <Badge variant={'secondary'} className={'[&>svg]:size-5'}>
                <CheckCircle2
                  className={'size-60 fill-primary stroke-accent'}
                />
                <span className={'text-base font-medium'}>Empower</span>
              </Badge>
              <Badge variant={'secondary'} className={'[&>svg]:size-5'}>
                <CheckCircle2
                  className={'size-60 fill-primary stroke-accent'}
                />
                <span className={'text-base font-medium'}>Connect</span>
              </Badge>
              <Badge variant={'secondary'} className={'[&>svg]:size-5'}>
                <CheckCircle2
                  className={'size-60 fill-primary stroke-accent'}
                />
                <span className={'text-base font-medium'}>Achieved</span>
              </Badge>
            </div>
          </CardFooter>
        </Card>

        <div className={'grid grid-cols-2 gap-6'}>
          <Card className={'bg-linear-to-r from-cyan-500 to-blue-500'}>
            <CardHeader>
              <CardTitle>
                <h4 className={'text-4xl font-bold text-background'}>10K+</h4>
              </CardTitle>
              <CardDescription className={''}>
                <p className={'text-background'}>
                  <span className={'font-semibold'}>Job seekers</span> placed in
                  their dream roles.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter className={'mt-auto'}>
              <CardAction>
                <Badge
                  variant={'outline'}
                  className={'text-background text-base'}>
                  Achievement
                </Badge>
              </CardAction>
            </CardFooter>
          </Card>
          <Card className={''}>
            <CardHeader>
              <CardTitle>
                <h4 className={'text-4xl font-bold'}>
                  5K
                  <span
                    className={
                      'bg-linear-to-r bg-clip-text text-transparent from-cyan-500 to-blue-500'
                    }>
                    +
                  </span>
                </h4>
              </CardTitle>
              <CardDescription className={''}>
                <p className={''}>
                  <span className={'font-semibold'}>
                    Companies trust Jobweez
                  </span>{' '}
                  to find top talent.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter className={'mt-auto'}>
              <CardAction>
                <Badge variant={'secondary'} className={'text-base px-3'}>
                  Trust
                </Badge>
              </CardAction>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <h4 className={'text-4xl font-bold'}>
                  20
                  <span
                    className={
                      'bg-linear-to-r bg-clip-text text-transparent from-cyan-500 to-blue-500'
                    }>
                    +
                  </span>
                </h4>
              </CardTitle>
              <CardDescription className={''}>
                <p className={''}>
                  <span className={'font-semibold'}>Industries covered</span>,
                  from tech to healthcare.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter className={'mt-auto'}>
              <CardAction>
                <Badge variant={'secondary'} className={'text-base px-3'}>
                  Diversity
                </Badge>
              </CardAction>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <h4 className={'text-4xl font-bold'}>See other statistics</h4>
              </CardTitle>
            </CardHeader>

            <CardAction className={'self-end px-6'}>
              <Button
                size={'icon-lg'}
                variant={'secondary'}
                className={'bg-foreground rounded-full'}>
                <CircleArrowOutDownRightIcon
                  className={'size-8 text-background'}
                />
              </Button>
            </CardAction>
          </Card>
        </div>
      </div>
    </section>
  );
}
