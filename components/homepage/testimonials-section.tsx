import { ImageIcon, StarIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
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
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../ui/item';

type Testimonial = {
  id: string;
  message: string;
  name: string;
  role: string;
  avatar: string;
  rating: string;
};

export const testimonials: Testimonial[] = [
  {
    id: crypto.randomUUID(),
    name: 'Mark Reynolds',
    message: `Jobweez made my job search effortless. I was
able to find multiple job opportunities within my
field and easily track my applications.`,
    role: 'Graphic Designer',
    avatar: '',
    rating: '4.2',
  },
  {
    id: crypto.randomUUID(),
    name: 'Emily Tricia',
    message: `The platform is so user-friendly! I love the job
search filters that helped me find exactly what I
was looking for. Kudos to them!”
`,
    role: 'Operations Manager',
    avatar: '',
    rating: '4.5',
  },
  {
    id: crypto.randomUUID(),
    name: 'Dan Johnson',
    message: `As a creative professional, I needed a platform
that understood my industry. Jobweez helped
me connect with design agencies.”`,
    role: 'Graphic Designer',
    avatar: '',
    rating: '4.0',
  },
  {
    id: crypto.randomUUID(),
    name: 'Fira Alicia',
    message: `I had been struggling to find the right job fit, but
Jobweez changed that. With its easy-tonavigate interface and job matching feature.”
`,
    role: 'Sales Manager',
    avatar: '',
    rating: '4.5',
  },
  {
    id: crypto.randomUUID(),
    name: 'Linda Reed',
    message: `I had been applying to jobs for months, but after
joining Jobweez, things changed. The platform
provided tailored job matches and job alerts.`,
    role: 'Customer Service',
    avatar: '',
    rating: '4.0',
  },
  {
    id: crypto.randomUUID(),
    name: 'David Miller',
    message: `The ability to track my applications in real-time
gave me peace of mind, and the responsive
support team was always there.”`,
    role: 'Financial Analyst',
    avatar: '',
    rating: '4.5',
  },
];

export default function TestimonialsSection() {
  return (
    <section className={'max-w-[85em] mx-auto'}>
      <Card className={'rounded-none border-none shadow-none bg-transparent'}>
        <CardHeader className={'text-center'}>
          <CardDescription>TESTIMONIALS</CardDescription>
          <CardTitle>
            <h2 className={'text-4xl font-medium'}>
              <span className={'block'}>Hear from Our</span>{' '}
              <span className={'block'}>Satisfied Users</span>
            </h2>
          </CardTitle>
        </CardHeader>

        <CardContent
          className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {testimonials.map((testimonial, idx) => {
            const isOddCard = idx % 2 === 0;
            return (
              <Fragment key={testimonial.id}>
                {isOddCard ? (
                  <Card
                    className={
                      'rounded-xl gap-4 bg-linear-to-r from-cyan-100 dark:from-cyan-500 to-blue-100 dark:to-blue-500'
                    }>
                    <CardAction className={'group px-6'}>
                      <Button
                        size={'lg'}
                        variant={'secondary'}
                        className={
                          'bg-foreground text-background group-hover:text-foreground font-semibold text-base rounded-full transition-colors ease-in-out'
                        }>
                        <StarIcon
                          className={
                            'text-background group-hover:text-foreground'
                          }
                        />
                        {testimonial.rating}
                      </Button>
                    </CardAction>
                    <CardContent>
                      <CardDescription>
                        <p className={'text-base text-foreground'}>
                          {testimonial.message}
                        </p>
                      </CardDescription>
                    </CardContent>
                    <CardFooter className={'w-full'}>
                      <Item
                        variant='outline'
                        className={'w-full border-none p-0'}>
                        <ItemContent>
                          <ItemTitle>
                            <h4 className={'font-semibold text-base'}>
                              {testimonial.name}
                            </h4>
                          </ItemTitle>
                          <ItemDescription className={'text-foreground'}>
                            {testimonial.role}
                          </ItemDescription>
                        </ItemContent>
                        <ItemMedia
                          variant={'image'}
                          className={
                            'rounded-full bg-muted-foreground/10 dark:bg-muted'
                          }>
                          <ImageIcon className={'size-6'} />
                        </ItemMedia>
                      </Item>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card className={'rounded-xl gap-4'}>
                    <CardAction className={'group px-6'}>
                      <Button
                        size={'lg'}
                        variant={'secondary'}
                        className={
                          'bg-foreground text-background group-hover:text-foreground font-semibold text-base rounded-full transition-colors ease-in-out'
                        }>
                        <StarIcon
                          className={
                            'text-background group-hover:text-foreground'
                          }
                        />
                        {testimonial.rating}
                      </Button>
                    </CardAction>
                    <CardContent>
                      <CardDescription>
                        <p className={'text-base text-muted-foreground'}>
                          {testimonial.message}
                        </p>
                      </CardDescription>
                    </CardContent>
                    <CardFooter className={'w-full'}>
                      <Item
                        variant='outline'
                        className={'w-full border-none p-0'}>
                        <ItemContent>
                          <ItemTitle>
                            <h4 className={'font-semibold text-base'}>
                              {testimonial.name}
                            </h4>
                          </ItemTitle>
                          <ItemDescription>{testimonial.role}</ItemDescription>
                        </ItemContent>
                        <ItemMedia
                          variant={'image'}
                          className={
                            'rounded-full bg-muted-foreground/10 dark:bg-muted'
                          }>
                          <ImageIcon className={'size-6'} />
                        </ItemMedia>
                      </Item>
                    </CardFooter>
                  </Card>
                )}
              </Fragment>
            );
          })}
        </CardContent>

        <CardContent className={'flex items-center justify-center'}>
          <Button
            size={'lg'}
            variant={'secondary'}
            className={'rounded-full font-semibold'}>
            Read all Testimonials
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
