import { useCurrentEditor } from '@tiptap/react';
import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/react/menus';
import { ToolbarControls } from './toolbar-controls';

export default function FloatingMenu() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <TiptapFloatingMenu
      editor={editor}
      className='bg-background flex items-center rounded-md border shadow-md relative z-200'>
      <ToolbarControls />
    </TiptapFloatingMenu>
  );
}
