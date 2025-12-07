'use client';

import { UploadCloudIcon, XCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState, useTransition } from 'react';
import {
  type DropEvent,
  type FileRejection,
  type FileWithPath,
  useDropzone,
} from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { FormDescription } from '@/components/ui/form';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Progress } from '@/components/ui/progress';
import { $fetch } from '@/lib/fetch';
import { cn } from '@/lib/utils';
import { ExtendedFileWithPreview } from '@/lib/zodSchemas/common.schema';
import { UpdateProfileInput } from '@/lib/zodSchemas/employer.schema';

const maxLength = 20;

function nameLengthValidator(file: File | null) {
  if (!file) {
    return null;
  }
  if (file?.name?.length > maxLength) {
    return {
      code: 'name-too-large',
      message: `Name is larger than ${maxLength} characters`,
    };
  }

  return null;
}

export default function UploadImage({ maxFiles }: { maxFiles: number }) {
  const [files, setFiles] = useState<ExtendedFileWithPreview[]>([]);
  const [progress, setProgress] = useState(0);
  const [isUploadPending, startUploadTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const form = useFormContext<Pick<UpdateProfileInput, 'image'>>();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      startUploadTransition(async () => {
        // Create preview files
        const previewFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFiles(previewFiles);

        // Upload the first file only in cloudinary
        const formData = new FormData();
        formData.append('avatar', acceptedFiles[0]);

        const { data, error } = await $fetch('/api/cloudinary/upload', {
          body: formData,
          method: 'POST',
        });

        if (error) {
          // set the form error
          form.setError('image', {
            type: 'manual',
            message: error.message,
          });
          toast.error(`Upload failed: Please try again.`, {
            description: error.message,
          });
          return;
        }

        // console.info('File uploaded successfully:', data);

        // Upload progress simulation
        let uploaded = 0;
        const total = previewFiles.length;
        const interval = setInterval(() => {
          uploaded += 1;
          setProgress((uploaded / total) * 100);
          if (uploaded >= total) {
            clearInterval(interval);
          }
        }, 1500);

        toast.success('Image uploaded successfully.');

        // set the url in the form
        form.setValue('image', data.fileUrl);

        // update the publicId and tags in the form files
        Object.assign(previewFiles[0], {
          publicId: data.publicId,
          tags: data.tags,
        });
      });
    },
    [form]
  );

  const onDropRejected = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (fileRejections: FileRejection[], event: DropEvent) => {
      // fileRejections.forEach((file) => {
      //   file.errors.forEach((e) => {
      //     console.error(`Error uploading ${file.file.name}: ${e.message}`);
      //   });
      // });

      // console.log({ fileRejections, event });

      // set the form error <fileRejections.length files not accepted>
      // Too many files
      form.setError(
        'image',
        {
          type: 'manual',
          // message: `${fileRejections.length} file(s) are not accepted.`,
          message: fileRejections[0].errors[0].message,
        },
        { shouldFocus: true }
      );
      toast.error(`File upload rejected. Please try again.`, {
        description: fileRejections[0].errors[0].message,
      });
    },
    [form]
  );

  // eslint-disable-next-line
  const onDropAccepted = useCallback((acceptedFiles: FileWithPath[]) => {
    // console.info({ acceptedFiles });
  }, []);

  const onError = useCallback(
    (error: Error) => {
      // console.error({ error });

      // set the form error
      form.setError('image', {
        type: 'manual',
        message: error.message,
      });
      toast.error(`Upload error: Please try again.`, {
        description: error.message,
      });
    },
    [form]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
    isFocused,
    open,
  } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp', '.svg'] },
    disabled: isUploadPending,
    minSize: 0,
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles,
    multiple: maxFiles > 1,
    noClick: true,
    noKeyboard: true,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onError,
    validator: nameLengthValidator,
  });

  const handleRemoveFile = (publicId: string) => {
    // Update the acceptedFiles state
    // Note: useDropzone does not provide a direct way to update acceptedFiles,
    // so you might need to manage your own state for files if you want to remove them.
    // remove all file from index 0 to idx-1
    // setFiles((prevFiles) => {
    //   if (!prevFiles) return prevFiles;
    //   const newFiles = [...prevFiles];
    //   newFiles.splice(idx - 1, 1);
    //   return newFiles;
    // });
    startDeleteTransition(async () => {
      // const currentFiles = watchFiles;
      const newFiles = [...files];
      // newFiles.splice(idx - 1, 1);

      // Delete from cloudinary could be added here
      const formData = new FormData();
      formData.append('publicId', publicId);

      const { data, error } = await $fetch('/api/cloudinary/delete', {
        body: formData,
        method: 'POST',
      });

      if (error) {
        toast.error(`Delete failed: Please try again.`, {
          description: error.message,
        });
        return;
      }
      const indexToRemove = newFiles.findIndex(
        (file) => file.publicId === publicId
      );
      if (indexToRemove !== -1) {
        newFiles.splice(indexToRemove, 1);
        // toast.success('Image removed successfully.');
      }

      // console.info('File deleted successfully:', data);

      // form.setValue('avatar', newFiles);
      setFiles(newFiles);

      form.setValue('image', '');

      toast.success(data.message);
    });
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='avatar'>User Avatar</FieldLabel>
          <div
            id='avatar'
            {...getRootProps()}
            className={cn(
              'min-h-[120px] h-full flex flex-col items-center justify-center rounded-lg border-card-foreground border-2 border-dashed',
              isDragActive
                ? 'border-primary bg-primary/75 dark:bg-primary/10'
                : 'hover:border-accent',
              'p-4 cursor-pointer transition-colors relative',

              isDragReject ||
                (form.formState.errors.image && 'border-destructive'),
              isDragAccept && 'border-primary',
              isFocused && 'border-primary focus:outline-none'
            )}>
            <input {...getInputProps()} id='avatar' />

            {isFocused && <p>Drop the files here ...</p>}

            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p className={'inline-flex items-center'}>
                Drag &lsquo;n&rsquo; drop some files here, or click to{' '}
                <Button
                  variant={'link'}
                  type='button'
                  onClick={open}
                  className={'px-1 py-0 h-fit mb-0'}>
                  <UploadCloudIcon className={'size-4'} />
                  Select File{maxFiles > 1 ? 's' : ''}
                </Button>
                files
              </p>
            )}

            {isDragReject && (
              <>
                {form.formState.errors.image?.message ? (
                  <Button
                    type='button'
                    variant='destructive'
                    size='icon-sm'
                    className='absolute top-2 right-2'
                    onClick={(e) => {
                      e.stopPropagation();
                      setFiles([]);
                      // form.reset({ avatar: [] });
                    }}>
                    <XCircleIcon />
                  </Button>
                ) : null}
              </>
            )}
          </div>

          {form.formState.errors.image?.message ? (
            <FieldError
              className={'text-xs'}
              errors={[form.formState.errors.image]}
            />
          ) : (
            <FormDescription className={'text-xs'}>
              {/* Upload avatar image file(s). Maximum size per file is 10MB. */}
              Upload avatar image file. Maximum size 10MB.
            </FormDescription>
          )}
        </Field>
      </FieldGroup>

      {/* Preview selected image */}
      <PreviewImage
        progress={progress}
        files={files}
        onRemoveFile={handleRemoveFile}
        isPending={isUploadPending || isDeletePending}
      />
    </>
  );
}

type PreviewImageProps = {
  progress: number;
  files: ExtendedFileWithPreview[];
  onRemoveFile: (publicId: string) => void;
  isPending: boolean;
};
function PreviewImage({
  progress,
  files,
  onRemoveFile,
  isPending,
}: PreviewImageProps) {
  const thumbs = files.map((file, idx) => (
    <li key={idx}>
      <Item variant='outline' size={'sm'}>
        <ItemMedia variant='image'>
          <Image
            src={file.preview}
            alt='Preview'
            width={80}
            height={80}
            className='object-scale-down w-full h-full'
            onLoad={() => {
              // Revoke data uri after image is loaded
              URL.revokeObjectURL(file.preview);
            }}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </ItemTitle>

          <Progress value={progress} className='w-full' />
        </ItemContent>
        <ItemActions>
          <Button
            disabled={isPending}
            type='button'
            size='icon-sm'
            variant='destructive'
            onClick={() => file.publicId && onRemoveFile(file.publicId)}>
            <XCircleIcon />
          </Button>
        </ItemActions>
      </Item>
    </li>
  ));
  return <ul className={'space-y-4'}>{thumbs}</ul>;
}
