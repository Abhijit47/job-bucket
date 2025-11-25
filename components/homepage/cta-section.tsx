import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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

export default function CTASection() {
  return (
    <section className={'max-w-[85em] mx-auto'}>
      <Card className={'bg-linear-to-tl from-cyan-500 to-blue-500 pt-16 pb-0'}>
        <CardHeader className={'text-center'}>
          <CardTitle>
            <h4 className={'text-3xl font-semibold'}>
              <span className={'block'}>Take the First Step</span>
              <span className={'block'}>Toward Your New Job</span>
            </h4>
          </CardTitle>
          <CardDescription>
            <p className={'text-base text-muted'}>
              Start your career path today and unlock endless job possibilities.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className={'flex items-center justify-center'}>
          <Button
            size={'lg'}
            className={'text-base font-medium rounded-full lg:py-6'}>
            Try Jobweez Now
          </Button>
        </CardContent>

        <CardContent
          className={
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-4 w-full mb-12'
          }>
          <div className={'space-y-2 relative'}>
            <CompanyInfo classNames={'blur-[0.8px] bg-background'} />
            <CompanyInfo
              classNames={'absolute -bottom-5 bg-background rotate-6 w-full'}
            />
          </div>
          <div className={'hidden lg:block'}>&nbsp;</div>
          <div className={'space-y-2 relative'}>
            <CompanyInfo classNames={'blur-[0.8px] bg-background'} />
            <CompanyInfo
              classNames={'absolute -bottom-5 bg-background -rotate-6 w-full'}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function CompanyInfo({ classNames }: { classNames: string }) {
  return (
    <Item variant='outline' size='sm' className={cn('rounded-xl', classNames)}>
      <ItemMedia variant={'image'} className={''}>
        <img
          src='/react.svg'
          alt='job-logo'
          width={32}
          height={32}
          className={'w-full h-full object-contain!'}
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
