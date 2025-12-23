'use client';

import UmamiAnalytics from '@danielgtmn/umami-react';
import { Databuddy } from '@databuddy/sdk/react';

const isDev = process.env.NODE_ENV === 'development';

export default function Analytics() {
  return (
    <>
      <UmamiAnalytics debug={isDev} />

      <Databuddy
        clientId={process.env.NEXT_PUBLIC_DATABUDDY_CLIENT_ID}
        trackWebVitals={true}
        trackPerformance={true}
        trackAttributes={true}
        trackErrors={true}
        trackScrollDepth={true}
        trackHashChanges={true}
        trackInteractions={true}
        trackOutgoingLinks={true}
      />
    </>
  );
}
