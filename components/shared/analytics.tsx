'use client';

import UmamiAnalytics from '@danielgtmn/umami-react';
const isDev = process.env.NODE_ENV === 'development';
export default function Analytics() {
  return (
    <>
      <UmamiAnalytics debug={isDev} />
    </>
  );
}
