'use client';

import { CloudUpload, X } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/extends/file-upload';
import { Button } from '@/components/ui/button';

import { AvatarValue, BannerValue } from '@/lib/zodSchemas/common.schema';
import { UpdateProfileInput } from '@/lib/zodSchemas/employer.schema';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../ui/field';

type ImageUploadProps = {
  name: 'avatar' | 'banner';
  id: string;
  label: string;
  description: string;
};

export function ImageUpload(props: ImageUploadProps) {
  const { name, id, label, description } = props;
  const form = useFormContext<
    AvatarValue | BannerValue | Pick<UpdateProfileInput, 'image'>
  >();

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          aria-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <FileUpload
              id={id}
              value={field.value}
              onValueChange={field.onChange}
              accept='image/*'
              maxFiles={1}
              maxSize={10 * 1024 * 1024}
              onFileReject={(_, message) => {
                form.setError(name, { message });
              }}
              multiple={false}>
              <FileUploadDropzone
                id={id}
                className='flex-row flex-wrap border-dotted text-center min-h-[80px]'>
                <CloudUpload className='size-4' />
                Drag and drop or
                <FileUploadTrigger asChild id={id}>
                  <Button variant='link' size='sm' className='p-0'>
                    choose files
                  </Button>
                </FileUploadTrigger>
                to upload
              </FileUploadDropzone>
              <FileUploadList>
                {field?.value?.map((file, index) => (
                  <FileUploadItem key={index} value={file}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant='ghost' size='icon' className='size-7'>
                        <X />
                        <span className='sr-only'>Delete</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
            {fieldState.error ? (
              <FieldError className={'text-xs'} errors={[fieldState.error]} />
            ) : (
              <FieldDescription className={'text-xs'}>
                {description}
              </FieldDescription>
            )}
          </FieldContent>
        </Field>
      )}
    />
  );
}
