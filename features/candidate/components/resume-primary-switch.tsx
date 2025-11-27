import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMakeResumePrimaryMutation } from '../hooks/use-candidates';

export default function ResumePrimarySwitch({
  id,
  isPrimary,
}: {
  id: string;
  isPrimary: boolean;
}) {
  const { mutate, isPending, isError } = useMakeResumePrimaryMutation();

  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id={`is-primary-${id}`}
        checked={isPrimary}
        onCheckedChange={() => mutate(id)}
        disabled={isPending}
        aria-invalid={isError}
      />
      <Label htmlFor={`is-primary-${id}`} aria-invalid={isError}>
        Primary
      </Label>
    </div>
  );
}
