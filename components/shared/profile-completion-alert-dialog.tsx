import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { IconAlertOctagon } from '@tabler/icons-react';
import Link from 'next/link';

export function ProfileCompletionAlertDialog({
  isOpen,
  title,
  description,
}: {
  isOpen: boolean;
  title: string;
  description: string;
}) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={'flex items-center gap-2'}>
            <IconAlertOctagon className={'size-6 stroke-destructive'} />
            <h1>{title}</h1>
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Link href={'/employer/settings'}>Complete Profile</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
