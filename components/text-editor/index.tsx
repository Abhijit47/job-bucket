import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import {
  EditorContent,
  EditorContext,
  useEditor,
  type AnyExtension,
  type EditorOptions,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DOMPurify from 'isomorphic-dompurify';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import {
  type ControllerFieldState,
  type ControllerRenderProps,
} from 'react-hook-form';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { UpdateCompanyProfileInput } from '@/lib/zodSchemas/employer.schema';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Skeleton } from '../ui/skeleton';
import BubbleMenu from './bubble-menu';
import FloatingMenu from './floating-menu';
import TextEditorFooter from './text-editor-footer';
import TextEditorHeader from './text-editor-header';

// Define the extensions to be used in the editor
const extensions: AnyExtension[] = [
  StarterKit,
  Highlight.configure({ multicolor: true }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':')
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          toast.error('The URL is not valid.');
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ['ftp', 'file', 'mailto'];
        const protocol = parsedUrl.protocol.replace(':', '');

        if (disallowedProtocols.includes(protocol)) {
          toast.error(`The protocol "${protocol}" is not allowed.`);
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === 'string' ? p : p.scheme
        );

        if (!allowedProtocols.includes(protocol)) {
          toast.error(`The protocol "${protocol}" is not allowed.`);
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          'example-phishing.com',
          'malicious-site.net',
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          toast.error(`The domain "${domain}" is not allowed.`);
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':')
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          'example-no-autolink.com',
          'another-no-autolink.com',
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
  Placeholder.configure({
    // Use a placeholder:
    placeholder: 'Write something …',
    // Use different placeholders depending on the node type:
    // placeholder: ({ node }) => {
    //   if (node.type.name === 'heading') {
    //     return 'What’s the title?'
    //   }

    //   return 'Can you add some further context?'
    // },
  }),
];

// Editor props for styling
const editorProps: EditorOptions['editorProps'] = {
  attributes: {
    class: cn(
      'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input rounded-md border bg-transparent transition-[color,box-shadow] outline-none',

      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',

      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',

      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

      'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none max-h-[140px] resize-none overflow-y-auto ring-1 ring-transparent focus:ring-2 focus:ring-blue-500 rounded-md p-4 dark:prose-invert max-w-full!'
    ),
  },
};

// Define the props for the TextEditor component
type TextEditorProps = {
  limit: number;
  field: ControllerRenderProps<UpdateCompanyProfileInput, 'companyDescription'>;
  fieldState: ControllerFieldState;
};

export default function TextEditor({
  limit,
  field,
  fieldState,
}: TextEditorProps) {
  // const form =
  //   useFormContext<Pick<UpdateCompanyProfileInput, 'companyDescription'>>();

  const editor = useEditor({
    extensions: [
      ...extensions,
      CharacterCount.configure({
        limit: limit,
        textCounter: (text) => [...new Intl.Segmenter().segment(text)].length,
        wordCounter: (text) =>
          text.split(/\s+/).filter((word) => word !== '').length,
      }),
    ],
    content: field.value,
    editorProps,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const sanitizedHtml = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'p',
          'br',
          'strong',
          'em',
          'u',
          'code',
          'mark',
          'a',
          'ul',
          'ol',
          'li',
          'blockquote',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'hr',
        ],
        ALLOWED_ATTR: ['href', 'class'],
      });
      // const json = editor.getJSON();
      // console.log('Editor content in HTML:', html);
      // console.log('Editor content in JSON:', json);
      // form.setValue('companyDescription', html, { shouldValidate: true });
      field.onChange(sanitizedHtml);
    },
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  if (!editor) {
    return (
      <div className={'space-y-2'}>
        <Skeleton className='h-3 w-2/12 rounded-md' />
        <Skeleton className='h-10 w-full rounded-md' />
        <Skeleton className='min-h-[140px] w-full rounded-md' />
        <Skeleton className='h-10 w-full rounded-md' />
      </div>
    );
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <FieldGroup className={'relative'}>
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}
          className={'w-full'}>
          <FieldLabel htmlFor='companyDescription'>
            Company Description
          </FieldLabel>
          <TextEditorHeader />
          <BubbleMenu />
          <FloatingMenu />
          <EditorContent
            placeholder='Write something...'
            id='companyDescription'
            editor={editor}
            aria-invalid={fieldState.invalid}
          />
          <TextEditorFooter limit={limit} />
        </Field>
      </FieldGroup>
    </EditorContext.Provider>
  );
}

export const LazyTextEditor = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => <Skeleton className='h-40 w-full rounded-md' />,
});
