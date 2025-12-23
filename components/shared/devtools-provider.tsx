'use client';

import { useDevtoolsBlocker } from 'devtools-blocker';

export function DevtoolsBlocker() {
  useDevtoolsBlocker();
  return null;
}
