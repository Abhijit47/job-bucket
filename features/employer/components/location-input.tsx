import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
import { Controller, useFormContext } from 'react-hook-form';

export default function LocationInput() {
  const form = useFormContext<Pick<CreateJobInput, 'city' | 'country'>>();

  return (
    <Card className={'gap-4'}>
      <CardHeader>
        <CardTitle>
          <h3>Location</h3>
        </CardTitle>
        <CardDescription>Specify the job location details.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Controller
            name='country'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='country'>Country</FieldLabel>
                <Input
                  id='country'
                  placeholder='ex: USA'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error?.message ? (
                  <FieldError
                    errors={[fieldState.error]}
                    className={'text-xs'}
                  />
                ) : (
                  <FieldDescription className={'text-xs'}>
                    Specify the country.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name='city'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='city'>City</FieldLabel>
                <Input
                  id='city'
                  placeholder='ex: California'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error?.message ? (
                  <FieldError
                    errors={[fieldState.error]}
                    className={'text-xs'}
                  />
                ) : (
                  <FieldDescription className={'text-xs'}>
                    Specify the city.
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
