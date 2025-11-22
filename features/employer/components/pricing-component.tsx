'use client';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authClient } from '@/lib/auth/client';
import { cn } from '@/lib/utils';
import NumberFlow from '@number-flow/react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

type Plans = {
  id: string;
  name: 'Hobby' | 'Pro' | 'Enterprise';
  price: {
    monthly: number | string;
    yearly: number | string;
  };
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  href: string;
};

const displayEmployerplans: Readonly<Plans>[] = [
  {
    id: crypto.randomUUID(),
    name: 'Hobby',
    price: {
      monthly: 'Free forever',
      yearly: 'Free forever',
    },
    description:
      'The perfect starting place for your web app or personal project.',
    features: [
      '5 jobs per month',
      'Basic AI suggestions',
      'Basic AI Resume review',
      'Basic candidate management',
      'Basic email support',
    ],
    cta: 'Get started for free',
    popular: false,
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    name: 'Pro',
    price: {
      monthly: 90,
      yearly: 75,
    },
    description: 'Everything you need to build and scale your business.',
    features: [
      'All Hobby plan features',
      '50 jobs per month',
      'Advanced AI suggestions',
      'Advanced AI Resume review',
      'Priority email support',
    ],
    cta: 'Subscribe to Pro',
    popular: true,
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    name: 'Enterprise',
    price: {
      monthly: 'Get in touch for pricing',
      yearly: 'Get in touch for pricing',
    },
    description: 'Critical security, performance, observability and support.',
    features: [
      'All Pro plan features',
      'Dedicated account manager.',
      'Invite your extended family.',
      'Unlimited monitors.',
      "We'll sit on your desk.",
    ],
    cta: 'Contact us',
    popular: false,
    href: '/contact-us',
  },
] as const;

type Frequency = 'monthly' | 'yearly';

const EmployerPricing = () => {
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const [isSubscriptionPending, startSubscriptionTransition] = useTransition();

  const hobbyPlanId = ['d4a6e6c3-5d47-4c7a-b828-9679eaab180d'];

  function handleSubscribe() {
    switch (frequency) {
      case 'monthly':
        startSubscriptionTransition(async () => {
          await authClient.checkout({
            products: ['2f3ef43d-ccd5-4287-9668-4dc694f4e8af'],
          });
        });
        break;

      case 'yearly':
        startSubscriptionTransition(async () => {
          await authClient.checkout({
            products: ['0e99c553-0d0d-4824-bc99-93a6e0a697fc'],
          });
        });
        break;

      default:
        toast.error('Please select a valid subscription frequency.');
        break;
    }
  }

  return (
    <div className='not-prose flex flex-col gap-16 px-8 py-24 text-center'>
      <div className='flex flex-col items-center justify-center gap-8'>
        <h1 className='mb-0 text-balance font-medium text-5xl tracking-tighter!'>
          Simple, transparent pricing
        </h1>
        <p className='mx-auto mt-0 mb-0 max-w-2xl text-balance text-lg text-muted-foreground'>
          Managing a business is hard enough, so why not make your life easier?
          Our pricing plans are simple, transparent and scale with you.
        </p>
        <Tabs
          defaultValue={frequency}
          onValueChange={(e) => {
            setFrequency(e as Frequency);
          }}>
          <TabsList>
            <TabsTrigger value='monthly'>Monthly</TabsTrigger>
            <TabsTrigger value='yearly'>
              Yearly
              <Badge variant='secondary'>20% off</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className='mt-8 w-full grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
          {displayEmployerplans.map((plan) => {
            return (
              <Card
                className={cn(
                  'relative w-full text-left',
                  plan.name === 'Pro' && 'ring-2 ring-primary'
                )}
                key={plan.id}>
                {plan.name === 'Pro' && (
                  <Badge className='-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full'>
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className='font-medium text-xl'>
                    {plan.name}
                  </CardTitle>
                  <CardDescription>
                    <p>{plan.description}</p>
                    {typeof plan.price[frequency as keyof typeof plan.price] ===
                    'number' ? (
                      <NumberFlow
                        className='font-bold text-foreground lg:text-xl xl:text-2xl'
                        format={{
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        }}
                        suffix={`/month, billed ${frequency}.`}
                        value={
                          plan.price[
                            frequency as keyof typeof plan.price
                          ] as number
                        }
                      />
                    ) : (
                      <span className='font-bold text-foreground lg:text-xl xl:text-2xl'>
                        {plan.price[frequency as keyof typeof plan.price]}.
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-2'>
                  {plan.features.map((feature, index) => (
                    <div
                      className='flex items-center gap-2 text-muted-foreground text-sm'
                      key={index}>
                      <BadgeCheck className='h-4 w-4' />
                      {feature}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  {plan.name === 'Pro' ? (
                    <Button
                      disabled={isSubscriptionPending}
                      className='w-full'
                      variant={plan.name === 'Pro' ? 'default' : 'outline'}
                      onClick={handleSubscribe}>
                      {plan.cta}
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  ) : plan.name === 'Hobby' ? (
                    <Button
                      disabled={isSubscriptionPending}
                      className='w-full'
                      variant={'outline'}
                      onClick={() => {
                        toast.promise(
                          authClient.checkout({
                            products: hobbyPlanId,
                          }),
                          {
                            id: 'hobby-plan-checkout',
                            className: 'text-xs',
                            icon: <Spinner className={'size-4'} />,
                            loading: 'Redirecting to checkout...',
                            success: 'Redirected to checkout!',
                            error: 'Failed to redirect to checkout.',
                            description:
                              'If the problem persists, please contact support.',
                          }
                        );
                      }}>
                      {plan.cta}
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  ) : (
                    <Link
                      aria-disabled={isSubscriptionPending}
                      href='#'
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'w-full',
                      })}>
                      {plan.cta}
                    </Link>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default EmployerPricing;
