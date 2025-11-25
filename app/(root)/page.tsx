import AboutSection from '@/components/homepage/about-section';
import ArticlesSection from '@/components/homepage/articles-section';
import CompanyLogosSection from '@/components/homepage/company-logos-section';
import CTASection from '@/components/homepage/cta-section';
import FaqsSection from '@/components/homepage/faqs-section';
import FeaturesSection from '@/components/homepage/features-section';
import HeroSection from '@/components/homepage/hero-section';
import JobsBrowseSection from '@/components/homepage/jobs-browse-section';
import TestimonialsSection from '@/components/homepage/testimonials-section';

export default async function Home() {
  // const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(
  //   trpc.hello.queryOptions({
  //     /** input */
  //     text: 'from Server Side',
  //   })
  // );

  // const greeting = await caller.hello({ text: 'from Server Side' });
  // return (
  //   <HydrationBoundary state={dehydrate(queryClient)}>
  //     <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
  //       <p>Test TRPC</p>
  //       <ErrorBoundary fallback={<div>Something went wrong page.</div>}>
  //         <Suspense fallback={<div>Loading...</div>}>
  //           <ClientGreeting />

  //           <div>
  //             <p className='mt-6 text-2xl'>
  //               Server Greeting: {greeting.greeting}
  //             </p>
  //           </div>
  //         </Suspense>
  //       </ErrorBoundary>
  //     </div>
  //   </HydrationBoundary>
  // );

  return (
    <div className='container'>
      <HeroSection />
      <CompanyLogosSection />
      <AboutSection />
      <FeaturesSection />
      <JobsBrowseSection />
      <ArticlesSection />
      <TestimonialsSection />
      <FaqsSection />
      <CTASection />
    </div>
  );
}
