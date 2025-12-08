import { useCurrentEditor, useEditorState } from '@tiptap/react';
import {
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  TextWrapIcon,
  UnderlineIcon,
  Undo2Icon,
  UnlinkIcon,
} from 'lucide-react';

import { Button } from '../ui/button';
import { Item, ItemContent } from '../ui/item';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Toggle } from '../ui/toggle';
import LinkButton from './link-button';
import ToolbarTooltip from './toolbar-tooltip';

export const headingLevels = [1, 2, 3, 4, 5, 6] as const;

type HeadingLevel = (typeof headingLevels)[number];

export default function TextEditorHeader() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor || !editor) return null;

      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,

        isHighlight: ctx.editor.isActive('highlight') ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        isLink: ctx.editor.isActive('link') ?? false,

        canRedo: editor.can().redo(),
        canUndo: editor.can().undo(),
        canHorizontalRule:
          ctx.editor.can().chain().setHorizontalRule().run() ?? false,
        canHardBreak: ctx.editor.can().chain().setHardBreak().run() ?? false,

        // can't use h1 because one only one h1 is allowed in html
        // isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
      };
    },
  });

  const handleHeadingChange = (value: string) => {
    if (!editor) return;
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number.parseInt(
        value.replace('heading', '')
      ) as HeadingLevel;
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  if (!editor || !editorState) {
    return null;
  }

  return (
    <Item
      variant='outline'
      size={'sm'}
      className={'bg-card sticky top-0 z-10 p-2'}>
      <ItemContent
        className={'flex flex-row flex-wrap items-center gap-1 lg:gap-2'}>
        <Select
          onValueChange={handleHeadingChange}
          value={
            editorState.isHeading2
              ? 'heading2'
              : editorState.isHeading3
              ? 'heading3'
              : editorState.isHeading4
              ? 'heading4'
              : editorState.isHeading5
              ? 'heading5'
              : editorState.isHeading6
              ? 'heading6'
              : 'paragraph'
          }>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Paragraph' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='paragraph'>Paragraph</SelectItem>
            <SelectItem value='heading2'>Heading 1</SelectItem>
            <SelectItem value='heading3'>Heading 2</SelectItem>
            <SelectItem value='heading4'>Heading 3</SelectItem>
            <SelectItem value='heading5'>Heading 4</SelectItem>
            <SelectItem value='heading6'>Heading 5</SelectItem>
          </SelectContent>
        </Select>

        <ToolbarTooltip content='Bold'>
          <Toggle
            size='sm'
            disabled={!editorState.canBold}
            pressed={editorState.isBold}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            aria-label='Toggle bold'
            className={'aria-pressed:bg-accent'}>
            <BoldIcon className='h-4 w-4' />
          </Toggle>
        </ToolbarTooltip>

        <ToolbarTooltip content='Italic'>
          <Toggle
            size='sm'
            disabled={!editorState.canItalic}
            pressed={editorState.isItalic}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            aria-label='Toggle bold'
            className={'aria-pressed:bg-accent'}>
            <ItalicIcon className='h-4 w-4' />
          </Toggle>
        </ToolbarTooltip>

        <ToolbarTooltip content='Underline'>
          <Toggle
            size='sm'
            disabled={!editorState.canUnderline}
            pressed={editorState.isUnderline}
            onPressedChange={() =>
              editor.chain().focus().toggleUnderline().run()
            }
            aria-label='Toggle underline'
            className={'aria-pressed:bg-accent'}>
            <UnderlineIcon className='h-4 w-4' />
          </Toggle>
        </ToolbarTooltip>

        <ToolbarTooltip content='Strikethrough'>
          <Toggle
            size='sm'
            disabled={!editorState.canStrike}
            pressed={editorState.isStrike}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            aria-label='Toggle strikethrough'
            className={'aria-pressed:bg-accent'}>
            <StrikethroughIcon className='h-4 w-4' />
          </Toggle>
        </ToolbarTooltip>

        <ToolbarTooltip content='Highlight'>
          <Toggle
            size='sm'
            pressed={editorState.isHighlight}
            onPressedChange={() =>
              editor.chain().focus().toggleHighlight({ color: '#fdeb80' }).run()
            }
            aria-label='Toggle highlight'
            className={'aria-pressed:bg-accent'}>
            <HighlighterIcon className='h-4 w-4' />
          </Toggle>
        </ToolbarTooltip>

        <ToolbarTooltip content='Code'>
          <Toggle
            size='sm'
            pressed={editorState.isCode}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            aria-label='Toggle code'
            className={'aria-pressed:bg-accent'}>
            <Code2Icon className='h-4 w-4' />
          </Toggle>
        </ToolbarTooltip>

        <ToolbarTooltip content='Bullet List'>
          <Toggle
            size='sm'
            pressed={editorState.isBulletList}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            aria-label='Toggle bullet list'
            className={'aria-pressed:bg-accent'}>
            <ListIcon className='h-4 w-4' />
          </Toggle>
        </ToolbarTooltip>

        <ToolbarTooltip content='Ordered List'>
          <Toggle
            size='sm'
            pressed={editorState.isOrderedList}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            aria-label='Toggle ordered list'
            className={'aria-pressed:bg-accent'}>
            <ListOrderedIcon className='h-4 w-4' />
          </Toggle>
        </ToolbarTooltip>

        <ToolbarTooltip content='Blockquote'>
          <Toggle
            size='sm'
            pressed={editorState.isBlockquote}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
            aria-label='Toggle blockquote'
            className={'aria-pressed:bg-accent'}>
            <QuoteIcon className='h-4 w-4' />
          </Toggle>
        </ToolbarTooltip>

        <Separator orientation='vertical' className='min-h-8 h-full' />

        {editorState.isLink ? (
          <Toggle
            pressed
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

        <Button
          type='button'
          size='sm'
          variant='ghost'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          aria-label='Undo'>
          <Undo2Icon className='h-4 w-4' />
        </Button>

        <Button
          type='button'
          size='sm'
          variant='ghost'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          aria-label='Redo'>
          <Redo2Icon className='h-4 w-4' />
        </Button>

        <Button
          type='button'
          size='sm'
          variant='ghost'
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={!editorState.canHorizontalRule}
          aria-label='Insert horizontal rule'>
          <MinusIcon className='h-4 w-4' />
        </Button>

        <Button
          type='button'
          size='sm'
          variant='ghost'
          onClick={() => editor.chain().focus().setHardBreak().run()}
          disabled={!editorState.canHardBreak}
          aria-label='Insert line break'>
          <TextWrapIcon className='h-4 w-4' />
        </Button>
      </ItemContent>
    </Item>
  );
}
