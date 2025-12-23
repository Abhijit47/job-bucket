import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/theme-provider';
import { TRPCReactProvider } from '@/trpc/client';

import { DevtoolsBlocker } from '@/components/shared/devtools-provider';
import siteMetadata from '@/constants/seo';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const isDev = process.env.NODE_ENV === 'development';

export const metadata: Metadata = {
  ...siteMetadata,
  // metadataBase: siteMetadata.metadataBase,
  // title: siteMetadata.title,
  // description: siteMetadata.description,
  // applicationName: siteMetadata.applicationName,
  // authors: siteMetadata.authors,
  // generator: siteMetadata.generator,
  // keywords: siteMetadata.keywords,
  // referrer: siteMetadata.referrer,
  // creator: siteMetadata.creator,
  // publisher: siteMetadata.publisher,
  // robots: {
  //   index: true,
  //   follow: true,
  //   nocache: true,
  // },
  // alternates: {
  //   canonical: 'https://example.com',
  //   languages: {
  //     'en-US': 'https://example.com/en-US',
  //   },
  // },
  // icons: 'https://example.com/icon.png',
  // manifest: 'https://example.com/manifest.json',
  // openGraph: {
  //   type: 'website',
  //   url: 'https://example.com',
  //   title: 'JobWeez',
  //   description: `Your ultimate job search companion. Find your dream job with ease.
  //   Explore thousands of job listings, get personalized recommendations, and stay ahead with real-time alerts. Start your journey to a better career today!
  //   JobWeez - Where Opportunities Meet Talent.
  //   `,
  //   siteName: 'JobWeez',
  //   images: [{ url: 'https://example.com/og.png' }],
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@site',
  //   creator: '@creator',
  //   images: 'https://example.com/og.png',
  // },
  // facebook: { appId: '12345678' },
  // // facebook: { admins: ['12345678'] },
  // pinterest: { richPin: true },
  // verification: {
  //   google: '1234567890',
  //   yandex: '1234567890',
  //   me: '1234567890',
  // },
  // abstract: 'My Website Description',
  // archives: 'https://example.com/archives',
  // assets: 'https://example.com/assets',
  // bookmarks: 'https://example.com/bookmarks',
  // category: 'My Category',
  // classification: 'My Classification',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            {children}
            <Toaster position='top-center' closeButton richColors />
          </ThemeProvider>
        </TRPCReactProvider>
        {!isDev ? <DevtoolsBlocker /> : null}
      </body>
    </html>
  );
}
