'use client';

// import AutoPlay from 'embla-carousel-autoplay';
import { companyLogos } from '@/constants';
import { useIsMobile } from '@/hooks/use-mobile';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

const isDev = process.env.NODE_ENV === 'development';

export default function CompanyLogosSection() {
  const isMobile = useIsMobile();

  return (
    <section className={'max-w-[85em] mx-auto'}>
      <Card
        className={'rounded-none shadow-none border-none bg-transparent py-8'}>
        <CardHeader>
          <CardDescription className={'text-center'}>
            <p className={'text-muted-foreground text-lg font-semibold'}>
              Trusted by Over 1,000 Company Worldwide
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className={'flex items-center gap-4 overflow-x-hidden'}>
          <Carousel
            // plugins={isDev ? undefined : [AutoPlay({ delay: 3000 })]}
            // AutoPlay({
            //   delay: 5000,
            //   jump: false,
            //   playOnInit: true,
            //   stopOnLastSnap: false,
            // }),
            plugins={isDev ? undefined : [AutoScroll({ speed: 2 })]}
            opts={{
              loop: true,
              direction: 'ltr',
              dragFree: true,
              dragThreshold: 10,
              duration: 200,
              startIndex: 0,
              slidesToScroll: 'auto',
            }}>
            <CarouselContent>
              {companyLogos.map((logo, idx) => (
                <CarouselItem
                  key={logo.id}
                  className='basis-3/12 md:basis-4/12 lg:basis-1/5 relative'>
                  <div className={'aspect-video lg:aspect-22/9 w-full h-full'}>
                    <Image
                      src={logo.logo}
                      alt={`Company Logo-${idx + 1}`}
                      width={500}
                      height={500}
                      className={
                        'hover:cursor-pointer w-full h-full object-cover'
                      }
                      priority={idx < 5 && !isMobile}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CardContent>
      </Card>
    </section>
  );
}
