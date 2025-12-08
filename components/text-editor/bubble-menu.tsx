import { useCurrentEditor } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';

import { ToolbarControls } from './toolbar-controls';

export default function BubbleMenu() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <TiptapBubbleMenu
      editor={editor}
      className='bg-background flex items-center rounded-md border shadow-md relative z-200'>
      <ToolbarControls />
    </TiptapBubbleMenu>
  );
}
