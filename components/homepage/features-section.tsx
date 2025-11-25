import {
  ArrowUpCircleIcon,
  ChevronDownIcon,
  ImageIcon,
  LucideGlasses,
  XIcon,
} from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
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
import { InputGroup, InputGroupInput, InputGroupText } from '../ui/input-group';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../ui/item';
import { Progress } from '../ui/progress';

export const cardTexts = [
  {
    id: crypto.randomUUID(),
    description: 'How to Stand Out to Employers',
  },
  {
    id: crypto.randomUUID(),
    description: 'Building a Winning Resume for Any Industry',
  },
  {
    id: crypto.randomUUID(),
    description: 'Mastering the Art of Job Searching',
  },
];

export default function FeaturesSection() {
  return (
    <section className={'max-w-[85em] mx-auto'}>
      <Card className={'rounded-none border-none shadow-none bg-transparent'}>
        <CardHeader className={'text-center'}>
          <CardDescription>FEATURES</CardDescription>
          <CardTitle>
            <h2 className={'text-4xl font-medium'}>
              <span className={'block'}>Experience a Smarter Way to</span>{' '}
              <span className={'block'}> Find Your Next Job</span>
            </h2>
          </CardTitle>
        </CardHeader>

        <div className={'grid grid-cols-1 lg:grid-cols-2 gap-6'}>
          <Card className={'bg-muted-foreground/5'}>
            <CardContent className={'space-y-2 px-16'}>
              <Item
                variant='outline'
                size='sm'
                className={'rounded-2xl grayscale blur-[0.8px]'}>
                <ItemMedia
                  variant={'image'}
                  className={'ring-1 ring-muted-foreground'}>
                  <img
                    src='/vite.svg'
                    alt='job-logo'
                    width={32}
                    height={32}
                    className={'w-full h-full p-1 object-contain!'}
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    <h3 className={'font-semibold text-base'}>UI Designer</h3>
                  </ItemTitle>
                  <ItemDescription>Pulse Tech</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ItemDescription className={'text-xs'}>
                    Posted yestarday
                  </ItemDescription>
                </ItemActions>
              </Item>
              <Item
                variant='outline'
                size='sm'
                className={'rounded-2xl scale-105'}>
                <ItemMedia
                  variant={'image'}
                  className={'ring ring-muted-foreground'}>
                  <img
                    src='/w3c.png'
                    alt='job-logo'
                    width={32}
                    height={32}
                    className={'w-full h-full p-1 object-contain!'}
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
              <Item
                variant='outline'
                size='sm'
                className={'rounded-2xl grayscale blur-[0.8px]'}>
                <ItemMedia
                  variant={'image'}
                  className={'ring-1 ring-muted-foreground'}>
                  <img
                    src='/react.svg'
                    alt='job-logo'
                    width={32}
                    height={32}
                    className={'w-full h-full p-1 object-contain!'}
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    <h3 className={'font-semibold text-base'}>UI Engineer</h3>
                  </ItemTitle>
                  <ItemDescription>Abigail Corporation</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ItemDescription className={'text-xs'}>
                    Posted 5 min ago
                  </ItemDescription>
                </ItemActions>
              </Item>
            </CardContent>
            <CardHeader>
              <CardTitle>
                <h3 className={'text-2xl'}>Diverse Job Listings</h3>
              </CardTitle>
              <CardDescription>
                <p className={'text-muted-foreground text-lg'}>
                  Explore job opportunities across various industries, from tech
                  to healthcare and beyond.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className={'bg-muted-foreground/5'}>
            <CardContent className={'max-w-sm w-full mx-auto'}>
              <Card className={'w-full h-full p-4 gap-3'}>
                <CardHeader className={'px-0'}>
                  <CardTitle className={'h-full'}>
                    <h3 className={'mt-2'}>Your Stats</h3>
                  </CardTitle>
                  <CardAction>
                    <Badge variant={'outline'} className={'rounded-lg text-sm'}>
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
            </CardContent>
            <CardHeader>
              <CardTitle>
                <h3 className={'text-2xl'}>Monitor Application Status</h3>
              </CardTitle>
              <CardDescription>
                <p className={'text-muted-foreground text-lg'}>
                  Stay informed with real-time updates on your job application
                  progress, so you re always in the loop.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
          <Card className={'col-span-full lg:col-span-2 bg-muted-foreground/5'}>
            <CardContent className={'flex items-start py-16 gap-4'}>
              {cardTexts.map((text, idx) => {
                const item1 = idx === 0;
                const item2 = idx === 1;
                const item3 = idx === 2;

                return (
                  <Fragment key={text.id}>
                    {item2 ? (
                      <Card
                        key={text.id}
                        className={
                          'aspect-square xl:aspect-video scale-105 w-full h-full py-0 px-2 relative bg-foreground/5 gap-0'
                        }>
                        <CardAction className={'self-end'}>
                          <ArrowUpCircleIcon
                            className={'size-8 stroke-1 rotate-45'}
                          />
                        </CardAction>
                        <CardContent className={'blur-[2px]'}>
                          <ImageIcon
                            className={
                              'size-16 mx-auto stroke-1 stroke-muted-foreground'
                            }
                          />
                        </CardContent>
                        <CardHeader
                          className={
                            'absolute bottom-0 left-0 w-full h-fit px-2 md:px-4 py-1 md:py-2 lg:py-4 bg-muted-foreground/50 rounded-b-xl'
                          }>
                          <CardDescription>
                            <p className={'text-background text-xs md:text-sm'}>
                              {text.description}
                            </p>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ) : item1 ? (
                      <Card
                        key={text.id}
                        className={
                          'aspect-square xl:aspect-video scale-90 rotate-6 w-full h-full py-0 px-2 relative bg-foreground/5 gap-0'
                        }>
                        <CardAction className={'self-end'}>
                          <ArrowUpCircleIcon
                            className={'size-8 stroke-1 rotate-45'}
                          />
                        </CardAction>
                        <CardContent className={'blur-[2px]'}>
                          <ImageIcon
                            className={
                              'size-16 mx-auto stroke-1 stroke-muted-foreground'
                            }
                          />
                        </CardContent>
                        <CardHeader
                          className={
                            'absolute bottom-0 left-0 w-full h-fit px-2 md:px-4 py-1 md:py-2 lg:py-4 bg-muted-foreground/50 rounded-b-xl'
                          }>
                          <CardDescription>
                            <p className={'text-background'}>
                              {text.description}
                            </p>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ) : item3 ? (
                      <Card
                        key={text.id}
                        className={
                          'aspect-square xl:aspect-video scale-90 -rotate-6 w-full h-full py-0 px-2 relative bg-foreground/5 gap-0'
                        }>
                        <CardAction className={'self-end'}>
                          <ArrowUpCircleIcon
                            className={'size-8 stroke-1 rotate-45'}
                          />
                        </CardAction>
                        <CardContent className={'blur-[2px]'}>
                          <ImageIcon
                            className={
                              'size-16 mx-auto stroke-1 stroke-muted-foreground'
                            }
                          />
                        </CardContent>
                        <CardHeader
                          className={
                            'absolute bottom-0 left-0 w-full h-fit px-2 md:px-4 py-1 md:py-2 lg:py-4 bg-muted-foreground/50 rounded-b-xl'
                          }>
                          <CardDescription>
                            <p className={'text-background'}>
                              {text.description}
                            </p>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ) : null}
                  </Fragment>
                );
              })}
            </CardContent>
            <CardHeader>
              <CardTitle>
                <h3 className={'text-2xl'}>Job Search Strategies</h3>
              </CardTitle>
              <CardDescription>
                <p className={'text-muted-foreground text-lg'}>
                  Learn proven techniques to streamline your job search and
                  increase your chances of success.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className={'col-span-full lg:col-span-1 bg-muted-foreground/5'}>
            <CardContent>
              <Card>
                <CardHeader className={''}>
                  <CardTitle className={'mt-1.5'}>
                    <h3 className={'text-xl'}>Job Details</h3>
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
                <CardContent>
                  <InputGroup className={''}>
                    <InputGroupText className={'p-2'}>
                      <LucideGlasses className={'size-4'} />
                    </InputGroupText>
                    <InputGroupInput placeholder='Job title or keywords' />
                  </InputGroup>
                </CardContent>
                <CardContent>
                  <Badge
                    variant={'outline'}
                    className={'text-sm rounded-lg border-none font-medium'}>
                    ui design
                  </Badge>
                  <Badge
                    variant={'outline'}
                    className={'text-sm rounded-lg border-none font-medium'}>
                    ui designer
                  </Badge>
                  <Badge
                    variant={'outline'}
                    className={'text-sm rounded-lg border-none'}>
                    frontend dev
                  </Badge>
                </CardContent>
              </Card>
            </CardContent>
            <CardHeader>
              <CardTitle>
                <h3 className={'text-2xl'}>Discover Jobs Instantly</h3>
              </CardTitle>
              <CardDescription>
                <p className={'text-muted-foreground text-lg'}>
                  Browse through thousands of opportunities instantly and take
                  the next step in your career.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Card>
    </section>
  );
}
