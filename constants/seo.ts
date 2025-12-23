import type { Metadata } from 'next';

const siteMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: 'JobWeez',
  description:
    'Your ultimate job search companion. Find your dream job with ease.Explore thousands of job listings, get personalized recommendations, and stay ahead with real-time alerts. Start your journey to a better career today! JobWeez - Where Opportunities Meet Talent.',
  applicationName: 'JobWeez',
  authors: [
    { name: 'JobWeez Team', url: `${process.env.NEXT_PUBLIC_APP_URL}/about` },
  ],
  generator: 'Next.js',
  keywords: [
    'job search',
    'career opportunities',
    'job listings',
    'personalized job recommendations',
    'real-time job alerts',
    'career development',
    'job application tracking',
    'resume builder',
    'interview preparation',
    'networking for jobs',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'JobWeez Team',
  publisher: 'JobWeez Inc.',
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
    languages: {
      'en-US': `${process.env.NEXT_PUBLIC_APP_URL}/en-US`,
    },
  },
  icons: `${process.env.NEXT_PUBLIC_APP_URL}/icon.png`,
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/manifest.json`,
  openGraph: {
    determiner: 'the',
    title: 'JobWeez',
    description:
      'Your ultimate job search companion. Find your dream job with ease.Explore thousands of job listings, get personalized recommendations, and stay ahead with real-time alerts. Start your journey to a better career today! JobWeez - Where Opportunities Meet Talent.',
    emails: ['someone@example.com'],
    phoneNumbers: ['+1-555-555-5555'],
    faxNumbers: ['+1-555-555-5556'],
    siteName: 'JobWeez',
    locale: 'en_IN',
    alternateLocale: ['en-US', 'fr-FR'],
    images: [
      {
        type: 'image/png',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og.png`,
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
    ],
    url: process.env.NEXT_PUBLIC_APP_URL,
    countryName: 'India',
    type: 'website',
    ttl: 86400, // 1 day in seconds
  },
  twitter: {
    card: 'summary_large_image',
    site: '@site',
    creator: '@creator',
    images: `${process.env.NEXT_PUBLIC_APP_URL}/og.png`,
  },
  facebook: { appId: '12345678' },
  // facebook: { admins: ['12345678'] },
  pinterest: { richPin: true },
  verification: {
    google: '1234567890',
    yandex: '1234567890',
    me: '1234567890',
  },
  abstract:
    'Your ultimate job search companion. Find your dream job with ease.Explore thousands of job listings, get personalized recommendations, and stay ahead with real-time alerts. Start your journey to a better career today! JobWeez - Where Opportunities Meet Talent.',
  archives: 'https://example.com/archives',
  assets: `${process.env.NEXT_PUBLIC_APP_URL}/assets`,
  bookmarks: `${process.env.NEXT_PUBLIC_APP_URL}/bookmarks`,
  category: 'Talent Acquisition',
  classification: 'Employment and Careers',
};

export default siteMetadata;
