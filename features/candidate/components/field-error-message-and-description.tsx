import { FieldDescription, FieldError } from '@/components/ui/field';
import { FieldError as FormFieldError } from 'react-hook-form';

export default function FieldErrorMessageAndDescription({
  error,
  description,
}: {
  error: FormFieldError | undefined;
  description: string;
}) {
  return (
    <>
      {error ? (
        <FieldError errors={[error]} className={'text-xs'} />
      ) : (
        <FieldDescription className={'text-xs'}>{description}</FieldDescription>
      )}
    </>
  );
}
