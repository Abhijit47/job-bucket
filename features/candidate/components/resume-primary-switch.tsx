'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function ResumePrimarySwitch({ id }: { id: string }) {
  const [isPrimary, setIsPrimary] = useState<boolean>(false);

  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id={`is-primary-${id}`}
        checked={isPrimary}
        onCheckedChange={(checked) => setIsPrimary(checked)}
        disabled={isPrimary}
      />
      <Label htmlFor={`is-primary-${id}`}>Primary</Label>
    </div>
  );
}
