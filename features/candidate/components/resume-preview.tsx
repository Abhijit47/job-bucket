'use client';

import {
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconZoomIn,
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import DocViewer, {
  DocViewerRenderers,
  MSDocRenderer,
  type IDocument,
} from 'react-doc-viewer';
// import { Document, Page, pdfjs } from 'react-pdf';
// import type { Options } from 'react-pdf/dist/shared/types.js';
import { toast } from 'sonner';
import { Spoiler } from 'spoiled';

import { Button } from '@/components/ui/button';

import { Skeleton } from '@/components/ui/skeleton';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// const url = import.meta.url;

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const options: Options = {
//   standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,

//   cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,

//   // wasmUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/wasm/`,

//   worker: new pdfjs.PDFWorker(),
// };

// dynamic import Document/Page so they are only loaded on the client
const Document = dynamic(() => import('react-pdf').then((m) => m.Document), {
  ssr: false,
});
const Page = dynamic(() => import('react-pdf').then((m) => m.Page), {
  ssr: false,
});

type ResumePreviewProps = {
  id: string;
  fileSize: string;
  fileType: string;
  fileUrl: string;
};

async function loadPdfJs() {
  const { pdfjs } = await import('react-pdf');
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export default function ResumePreview(props: ResumePreviewProps) {
  const { fileSize, fileType } = props;

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [progress, setProgress] = useState(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error: Error): void {
    toast.error(`Error while loading document: ${error.message}`, {
      description: 'Please try again later.',
    });
    return;
  }

  function onDocumentLoadProgress(progressData: {
    loaded: number;
    total: number;
  }): void {
    console.log(
      `Loading progress: ${progressData.loaded} of ${progressData.total}`
    );
    setProgress((progressData.loaded / progressData.total) * 100);

    return;
  }

  function onDocumentSourceError(error: Error): void {
    toast.error(`Error while loading document source: ${error.message}`, {
      description: 'Please try again later.',
    });
    return;
  }

  function onDocumentSourceSuccess() {
    console.log('Successfully loaded document source.');
    return;
  }

  const docs: IDocument[] = [
    // {
    //   uri:
    //     "http://localhost:9000/uploads/ULRYB3ATJ56B/Screenshot%202021-04-28%20at%2014.04.23.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minio%2F20210507%2F%2Fs3%2Faws4_request&X-Amz-Date=20210507T142426Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=761187860be22801088ab8c212733f7f52af8f62d638f1341ee2ae4c18944251"
    //   // "http://localhost:9000/uploads/6QK5HJ84MAEM/RAS-118_CompanyCodes__SalesOffices.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minio%2F20210507%2F%2Fs3%2Faws4_request&X-Amz-Date=20210507T110429Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=c20f9b77ffdc1a15910cea5acd3420b6583a1d4d38ce5716da30f1d0ea4315d5"
    //   // "https://res.cloudinary.com/cloudinaryforme/image/upload/v1618339571/workplace-1245776_1920_i9ayae.jpg"
    // },

    // {
    //   uri:
    //     "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf"
    // },
    // { uri: require('./test-excelaki.xlsx') },
    // { uri: require('./test-doc.docx') },
    // { uri: 'http://localhost:3000/sample-resume.docx' },
    {
      uri: 'https://res.cloudinary.com/dhrvwpfc2/raw/upload/v1764513040/job-bucket/sample-resume_tpb7yo.docx',
    },
  ];

  useEffect(() => {
    // configure pdfjs worker only on the client
    loadPdfJs();
  }, []);

  if (fileType !== 'application/pdf') {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button size='sm' variant='outline'>
            <IconZoomIn />
            Preview
          </Button>
        </SheetTrigger>
        <SheetContent className='w-[400px] sm:w-[540px]'>
          <SheetHeader>
            <SheetTitle>Resume Preview</SheetTitle>
            <SheetDescription>
              <span className={'block'}>View the details of your resume.</span>
              <small className={'block'}>
                {fileType} - {fileSize}
              </small>
            </SheetDescription>
          </SheetHeader>
          {/* <Spoiler density={0.2} fps={16} revealOn='click'> */}
          <div className='w-full h-full'>
            <DocViewer
              className='w-full h-full'
              pluginRenderers={[MSDocRenderer, ...DocViewerRenderers]}
              documents={docs}
              theme={{
                primary: 'var(--color-sidebar-primary)',
                secondary: '#F9FAFB',
                tertiary: '#111827',
              }}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          {/* </Spoiler> */}
          <SheetFooter>
            <SheetClose asChild>
              <Button variant='outline' size={'sm'}>
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  if (fileType === 'application/pdf') {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button size='sm' variant='outline'>
            <IconZoomIn />
            Preview
          </Button>
        </SheetTrigger>
        <SheetContent className='w-[400px] sm:w-[540px] h-full'>
          <SheetHeader>
            <SheetTitle>Resume Preview</SheetTitle>

            <Separator />
            <Progress value={progress} className='w-full' />
            <Separator />

            <SheetDescription>
              <span className={'block'}>View the details of your resume.</span>
              <small className={'block'}>
                {fileType} - {fileSize}
              </small>
            </SheetDescription>
            <Separator />
          </SheetHeader>

          <Spoiler
            density={0.2}
            fps={16}
            revealOn='click'
            mimicWords={true}
            fallback={'Loading preview...'}>
            <div className='h-full w-full px-4'>
              <Document
                className={'h-full w-full'}
                error={<p>Failed to load PDF document.</p>}
                loading={<Skeleton className='h-full! w-full! animate-pulse' />}
                file={
                  // TODO: replace with props.fileUrl
                  'https://res.cloudinary.com/dhrvwpfc2/image/upload/v1764513108/job-bucket/functionalsample_zvt2n0.pdf'
                }
                // options={options}
                onLoadError={onDocumentLoadError}
                onLoadProgress={onDocumentLoadProgress}
                onLoadSuccess={onDocumentLoadSuccess}
                onSourceError={onDocumentSourceError}
                onSourceSuccess={onDocumentSourceSuccess}
                scale={1}>
                <Page
                  className={'h-full w-full'}
                  error={<p>Failed to load page.</p>}
                  loading={
                    <Skeleton className='h-full! w-full! animate-pulse' />
                  }
                  noData={<p>No page data available.</p>}
                  pageNumber={pageNumber}
                />
              </Document>
            </div>
          </Spoiler>

          <SheetFooter className={'flex-row w-full'}>
            <Button
              variant='outline'
              size={'sm'}
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}>
              <IconChevronLeftPipe />
              Prev
            </Button>
            <Badge variant='secondary' className='mx-2'>
              Page {pageNumber} of {numPages}
            </Badge>
            <Button
              type='submit'
              size={'sm'}
              disabled={pageNumber >= (numPages || 0)}
              onClick={() => setPageNumber(pageNumber + 1)}>
              Next
              <IconChevronRightPipe />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
}

export const LazyResumePreview = dynamic(() => import('./resume-preview'), {
  ssr: false,
  loading: () => <Skeleton className='h-8 w-24 animate-pulse' />,
});
