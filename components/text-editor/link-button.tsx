import { useCurrentEditor } from '@tiptap/react';
import { Link2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function LinkButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { editor } = useCurrentEditor();
  const [linkUrl, setLinkUrl] = useState('');
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const handleSetLink = () => {
    if (!editor) return;

    if (linkUrl) {
      // Validate URL format and protocol
      try {
        const url = new URL(linkUrl);
        // Only allow http(s) protocols
        if (!['http:', 'https:'].includes(url.protocol)) {
          toast.error('Only HTTP and HTTPS URLs are allowed');
          return;
        }

        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: linkUrl })
          .run();
      } catch (e) {
        console.error(e);
        toast.error('Please enter a valid URL');
        return;
      }
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }

    setIsLinkPopoverOpen(false);
    setLinkUrl('');
  };

  return (
    <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      {/* // this is the main */}
      {/* trigger point */}
      <PopoverContent className='w-80 p-4'>
        <div className='flex flex-col gap-4'>
          <h3 className='font-medium inline-flex items-center gap-2'>
            <Link2Icon className='size-4' />
            Insert Link
          </h3>
          <Input
            placeholder='https://example.com'
            type='url'
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSetLink();
              }
            }}
          />
          <div className='flex justify-between'>
            <Button
              size={'sm'}
              variant='outline'
              onClick={() => setIsLinkPopoverOpen(false)}>
              Cancel
            </Button>
            <Button size={'sm'} onClick={handleSetLink}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
