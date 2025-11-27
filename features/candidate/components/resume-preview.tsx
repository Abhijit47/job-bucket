'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { IconFileTypePdf, IconX, IconZoomIn } from '@tabler/icons-react';
import { Spoiler } from 'spoiled';

export default function ResumePreview({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline'>
          <IconZoomIn />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            Resume Preview
            <Spoiler
              density={0.2}
              fps={16}
              // theme={resolvedTheme as 'system' | 'dark' | 'light'}
            >
              <small className={'text-xs'}>{id}</small>
            </Spoiler>
          </DialogTitle>
          <DialogDescription>
            View the details of your resume.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className='grid gap-4'>
          <IconFileTypePdf className={'w-full h-full'} />
        </div>
        {/* <div className='grid gap-4'>
          <div className='grid gap-3'>
            <Label htmlFor='name-1'>Name</Label>
            <Input id='name-1' name='name' defaultValue='Pedro Duarte' />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='username-1'>Username</Label>
            <Input id='username-1' name='username' defaultValue='@peduarte' />
          </div>
        </div> */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' size={'sm'}>
              <IconX />
              Close
            </Button>
          </DialogClose>
          {/* <Button type='submit'>Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
