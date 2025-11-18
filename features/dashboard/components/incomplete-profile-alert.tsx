import { buttonVariants } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import type { Route } from 'next';
import Link from 'next/link';

export default function IncompleteProfileAlert({
  pathname,
}: {
  pathname: Route;
}) {
  return (
    <Item size={'sm'} variant='destructive' className={'w-full'}>
      <ItemContent>
        <ItemTitle>Incomplete Profile</ItemTitle>
        <ItemDescription>
          Your profile is incomplete. Please complete your profile to gain full
          access to all features and functionalities.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Link
          prefetch={true}
          href={pathname}
          className={buttonVariants({
            variant: 'destructive',
            size: 'sm',
          })}>
          Complete Profile
        </Link>
      </ItemActions>
    </Item>
  );
}
