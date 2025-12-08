import { useCurrentEditor, useEditorState } from '@tiptap/react';
import {
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UnlinkIcon,
} from 'lucide-react';
import { Toggle } from '../ui/toggle';
import LinkButton from './link-button';

export function ToolbarControls() {
  const { editor } = useCurrentEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx || !ctx.editor) return null;
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        isHighlight: ctx.editor.isActive('highlight') ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        isLink: ctx.editor.isActive('link') ?? false,
      };
    },
  });

  if (!editor || !editorState) {
    return null;
  }

  return (
    <>
      <Toggle
        size='sm'
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label='Toggle bold'>
        <BoldIcon className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label='Toggle italic'>
        <ItalicIcon className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label='Toggle underline'>
        <UnderlineIcon className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label='Toggle strikethrough'>
        <StrikethroughIcon className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editorState.isHighlight}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: '#fdeb80' }).run()
        }
        aria-label='Toggle highlight'>
        <HighlighterIcon className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label='Toggle code'>
        <Code2Icon className='h-4 w-4' />
      </Toggle>
      <div className='bg-border mx-1 h-6 w-px' />

      <Toggle
        size='sm'
        pressed={editorState.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label='Toggle bullet list'>
        <ListIcon className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editorState.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label='Toggle ordered list'>
        <ListOrderedIcon className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label='Toggle blockquote'>
        <QuoteIcon className='h-4 w-4' />
      </Toggle>

      <div className='bg-border mx-1 h-6 w-px' />

      {editorState.isLink ? (
        <Toggle
          pressed
          size='sm'
          aria-label='Remove link'
          onPressedChange={() =>
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
          }>
          <UnlinkIcon className='h-4 w-4' />
        </Toggle>
      ) : (
        <LinkButton>
          <Toggle size='sm' aria-label='Toggle link'>
            <LinkIcon className='h-4 w-4' />
          </Toggle>
        </LinkButton>
      )}
    </>
  );
}
