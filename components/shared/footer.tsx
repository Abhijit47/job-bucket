import { Separator } from '@/components/ui/separator';
import { footerLinks } from '@/constants';
import { InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { LazyLogo } from './logo';

// interface FooterLinkProps {
//   href: string;
//   children: React.ReactNode;
// }

// const FooterLink = ({ href, children }: FooterLinkProps) => (
//   <Link
//     href={href}
//     className='text-gray-600 hover:text-gray-900 transition-colors'>
//     {children}
//   </Link>
// );

// interface FooterSectionProps {
//   title: string;
//   links: { label: string; href: string }[];
// }

// const FooterSection = ({ title, links }: FooterSectionProps) => (
//   <div className='flex flex-col space-y-4'>
//     <h3 className='font-medium text-lg'>{title}</h3>
//     <nav className='flex flex-col space-y-3'>
//       {links.map((link) => (
//         <FooterLink key={crypto.randomUUID()} href={link.href}>
//           {link.label}
//         </FooterLink>
//       ))}
//     </nav>
//   </div>
// );

export default function Footer() {
  return (
    <footer className='max-w-[85em] mx-auto px-4 2xl:px-2 space-y-8'>
      <div className={'grid grid-cols-5 gap-6 py-12'}>
        <div className={'col-span-full lg:col-span-2 space-y-4'}>
          <a href='#' className={'inline-flex items-center gap-2'}>
            <LazyLogo />
          </a>
          <h5 className={'text-base text-muted-foreground'}>
            Jobweez is a dynamic job search platform designed to connect{' '}
            <span className={'font-semibold'}>talented professionals</span> with{' '}
            <span className={'font-semibold'}>top companies.</span>
          </h5>
        </div>
        <div className={'col-span-full lg:col-span-1 space-y-2'}>
          <h6 className={'text-sm font-semibold text-muted-foreground'}>
            Company
          </h6>
          <ul className={'space-y-2'}>
            {footerLinks.company.map((link1) => (
              <li key={link1.id}>
                <Link
                  href={link1.href}
                  className={buttonVariants({
                    variant: 'link',
                    className: 'px-0! h-6! rounded-none!',
                  })}>
                  {link1.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={'col-span-full lg:col-span-1 space-y-2'}>
          <h6 className={'text-sm font-semibold text-muted-foreground'}>
            Features
          </h6>
          <ul className={'space-y-2'}>
            {footerLinks.features.map((link2) => (
              <li key={link2.id}>
                <a
                  href={link2.href}
                  className={buttonVariants({
                    variant: 'link',
                    className: 'px-0! h-6! rounded-none!',
                  })}>
                  {link2.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={'col-span-full lg:col-span-1 space-y-2'}>
          <h6 className={'text-sm font-semibold text-muted-foreground'}>
            Resources
          </h6>
          <ul className={'space-y-2'}>
            {footerLinks.resources.map((link3) => (
              <li key={link3.id}>
                <a
                  href={link3.href}
                  className={buttonVariants({
                    variant: 'link',
                    className: 'px-0! h-6! rounded-none!',
                  })}>
                  {link3.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Separator />
      <div className={'flex items-center justify-between py-4'}>
        <p className={'text-sm text-muted-foreground'}>
          &copy; Copyright JobWeez {new Date().getFullYear()}
        </p>

        <div className={'inline-flex items-center gap-2'}>
          <a
            href='#'
            className={
              'p-2 rounded-full bg-muted-foreground/10 ring-1 ring-muted-foreground'
            }>
            <InstagramIcon className={'stroke-foreground'} />
          </a>
          <a
            href='#'
            className={
              'p-2 rounded-full bg-muted-foreground/10 ring-1 ring-muted-foreground'
            }>
            <TwitterIcon className={'stroke-foreground'} />
          </a>
          <a
            href='#'
            className={
              'p-2 rounded-full bg-muted-foreground/10 ring-1 ring-muted-foreground'
            }>
            <YoutubeIcon className={'stroke-foreground'} />
          </a>
        </div>
      </div>
    </footer>
  );

  // return (
  //   <footer className='w-full py-12 px-4 sm:px-6 lg:px-8 border-t'>
  //     <div className='max-w-7xl mx-auto'>
  //       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12'>
  //         {/* Logo and Tagline */}
  //         <div className='space-y-4 md:max-w-xs'>
  //           <div className='flex items-center space-x-2'>
  //             <Logo />
  //           </div>
  //           <p className='text-gray-600'>Ship faster with Tailwind Blocks</p>
  //         </div>

  //         {/* Product Section */}
  //         <FooterSection
  //           title='Product'
  //           links={[
  //             { label: 'Overview', href: '/overview' },
  //             { label: 'Pricing', href: '/pricing' },
  //             { label: 'Marketplace', href: '/marketplace' },
  //             { label: 'Features', href: '/features' },
  //             { label: 'Integrations', href: '/integrations' },
  //             { label: 'Pricing', href: '/pricing' },
  //           ]}
  //         />

  //         {/* Company Section */}
  //         <FooterSection
  //           title='Company'
  //           links={[
  //             { label: 'About', href: '/about' },
  //             { label: 'Team', href: '/team' },
  //             { label: 'Blog', href: '/blog' },
  //             { label: 'Careers', href: '/careers' },
  //             { label: 'Contact', href: '/contact' },
  //             { label: 'Privacy', href: '/privacy' },
  //           ]}
  //         />

  //         {/* Resources Section */}
  //         <FooterSection
  //           title='Resources'
  //           links={[
  //             { label: 'Help', href: '/help' },
  //             { label: 'Sales', href: '/sales' },
  //             { label: 'Advertise', href: '/advertise' },
  //           ]}
  //         />

  //         {/* Social Section */}
  //         <FooterSection
  //           title='Social'
  //           links={[
  //             { label: 'Twitter', href: 'https://twitter.com' },
  //             { label: 'Instagram', href: 'https://instagram.com' },
  //             { label: 'LinkedIn', href: 'https://linkedin.com' },
  //           ]}
  //         />
  //       </div>

  //       <Separator className='my-8' />

  //       <div className='flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500'>
  //         <p>© {new Date().getFullYear()} Job Bucket. All rights reserved.</p>
  //         <div className='flex gap-4 mt-4 sm:mt-0'>
  //           <Link
  //             href='/terms'
  //             className='hover:text-gray-900 transition-colors'>
  //             Terms and Conditions
  //           </Link>
  //           <Link
  //             href='/privacy-policy'
  //             className='hover:text-gray-900 transition-colors'>
  //             Privacy Policy
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </footer>
  // );
}
