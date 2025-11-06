import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import React from 'react';
import Logo from './logo';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link
    href={href}
    className='text-gray-600 hover:text-gray-900 transition-colors'>
    {children}
  </Link>
);

interface FooterSectionProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterSection = ({ title, links }: FooterSectionProps) => (
  <div className='flex flex-col space-y-4'>
    <h3 className='font-medium text-lg'>{title}</h3>
    <nav className='flex flex-col space-y-3'>
      {links.map((link) => (
        <FooterLink key={crypto.randomUUID()} href={link.href}>
          {link.label}
        </FooterLink>
      ))}
    </nav>
  </div>
);

export default function Footer() {
  return (
    <footer className='w-full py-12 px-4 sm:px-6 lg:px-8 border-t'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12'>
          {/* Logo and Tagline */}
          <div className='space-y-4 md:max-w-xs'>
            <div className='flex items-center space-x-2'>
              <Logo />
              <span className='text-xl font-bold'>Job Bucket</span>
            </div>
            <p className='text-gray-600'>Ship faster with Tailwind Blocks</p>
          </div>

          {/* Product Section */}
          <FooterSection
            title='Product'
            links={[
              { label: 'Overview', href: '/overview' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Marketplace', href: '/marketplace' },
              { label: 'Features', href: '/features' },
              { label: 'Integrations', href: '/integrations' },
              { label: 'Pricing', href: '/pricing' },
            ]}
          />

          {/* Company Section */}
          <FooterSection
            title='Company'
            links={[
              { label: 'About', href: '/about' },
              { label: 'Team', href: '/team' },
              { label: 'Blog', href: '/blog' },
              { label: 'Careers', href: '/careers' },
              { label: 'Contact', href: '/contact' },
              { label: 'Privacy', href: '/privacy' },
            ]}
          />

          {/* Resources Section */}
          <FooterSection
            title='Resources'
            links={[
              { label: 'Help', href: '/help' },
              { label: 'Sales', href: '/sales' },
              { label: 'Advertise', href: '/advertise' },
            ]}
          />

          {/* Social Section */}
          <FooterSection
            title='Social'
            links={[
              { label: 'Twitter', href: 'https://twitter.com' },
              { label: 'Instagram', href: 'https://instagram.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
            ]}
          />
        </div>

        <Separator className='my-8' />

        <div className='flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500'>
          <p>© {new Date().getFullYear()} Job Bucket. All rights reserved.</p>
          <div className='flex gap-4 mt-4 sm:mt-0'>
            <Link
              href='/terms'
              className='hover:text-gray-900 transition-colors'>
              Terms and Conditions
            </Link>
            <Link
              href='/privacy-policy'
              className='hover:text-gray-900 transition-colors'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
