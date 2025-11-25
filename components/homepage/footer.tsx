import { InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import viteLogo from '/vite.svg';

import { buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';

export const footerLinks = {
  company: [
    {
      id: crypto.randomUUID(),
      title: 'Our Mission',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      title: 'Our Vision',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      title: 'Our Story',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      title: 'Meet Our Team',
      href: '#',
    },
  ],
  features: [
    {
      id: crypto.randomUUID(),
      title: 'Job Search',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      title: 'Browse Industries',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      title: 'Career Resources',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      title: 'Job Alerts',
      href: '#',
    },
  ],
  resources: [
    {
      id: crypto.randomUUID(),
      title: 'Blog',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      title: 'Case Studies',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      title: 'Whitepapers',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      title: 'eBooks',
      href: '#',
    },
  ],
};

export default function Footer() {
  return (
    <footer className='max-w-[85em] mx-auto px-4 2xl:px-2 space-y-8'>
      <div className={'grid grid-cols-5 gap-6 py-12'}>
        <div className={'col-span-full lg:col-span-2 space-y-4'}>
          <a href='#' className={'inline-flex items-center gap-2'}>
            <img src={viteLogo} alt='logo' width={32} height={32} />
            <span className={'font-bold text-lg text-primary'}>JobWeez</span>
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
                <a
                  href={link1.href}
                  className={buttonVariants({
                    variant: 'link',
                    className: 'px-0! h-6! rounded-none!',
                  })}>
                  {link1.title}
                </a>
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
                  {link2.title}
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
                  {link3.title}
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
}
