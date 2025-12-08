import { cn } from '@/lib/utils';
import { useCurrentEditor, useEditorState } from '@tiptap/react';
import { Item, ItemContent, ItemDescription, ItemMedia } from '../ui/item';
import { Skeleton } from '../ui/skeleton';

export default function TextEditorFooter({ limit }: { limit: number }) {
  const { editor } = useCurrentEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      charactersCount: ctx?.editor?.storage.characterCount.characters(),
      wordsCount: ctx?.editor?.storage.characterCount.words(),
    }),
  });

  if (!editor || !editorState) {
    return <Skeleton className='h-10 w-full rounded-md' />;
  }

  const { charactersCount, wordsCount } = editorState;

  const percentage =
    editor && charactersCount != null
      ? Math.round((100 / limit) * charactersCount)
      : 0;

  return (
    <Item
      variant='outline'
      size={'sm'}
      className={'bg-card sticky bottom-0 z-10 p-2'}>
      <ItemContent
        className={'flex flex-row flex-wrap items-center gap-1 lg:gap-2'}>
        <ItemMedia variant={'image'}>
          <svg height='32' width='32' viewBox='0 0 20 20'>
            <circle
              r='10'
              cx='10'
              cy='10'
              fill='currentColor'
              className={'text-accent'}
            />
            <circle
              r='5'
              cx='10'
              cy='10'
              fill='transparent'
              stroke='currentColor'
              strokeWidth='10'
              strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
              transform='rotate(-90) translate(-20)'
            />
            <circle
              r='6'
              cx='10'
              cy='10'
              fill='currentColor'
              className='text-card'
            />
          </svg>
        </ItemMedia>
        <ItemContent>
          <ItemDescription
            // className={`character-count ${
            //   charactersCount === limit ? 'character-count--warning' : ''
            // }`}>
            className={cn(
              'character-count',
              charactersCount === limit && 'character-count--warning'
            )}>
            {charactersCount} / {limit} characters
          </ItemDescription>
          <ItemDescription>{wordsCount} words</ItemDescription>
        </ItemContent>
      </ItemContent>
    </Item>
  );
}
