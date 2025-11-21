// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldLabel,
// } from '@/components/ui/field';
// import { CreateJobInput } from '@/lib/zodSchemas/employer.schema';
// import { Controller, useFormContext } from 'react-hook-form';

// import { Badge } from '@/components/ui/badge';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';
// import { jobBenifits } from '@/drizzle/db-constants';
// import { capitalizeFirstLetter } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const applyOptions = [
  {
    value: 'on-job-bucket',
    title: 'On JobBucket',
    description:
      ' Let candidates apply directly on JobBucket platform & all applications will show on your dashboard.',
  },
  {
    value: 'external-platform',
    title: 'External Platform',
    description:
      ' Candidates apply jobs on your website, all applications on your own website.',
  },
  {
    value: 'on-your-email',
    title: 'On Your Email',
    description:
      ' Candidates apply jobs on your email, all applications on your own email.',
  },
] as const;

export type ApplyOption = (typeof applyOptions)[number]['value'];

export default function ApplyJobInput() {
  return (
    <Card className={'gap-2'}>
      <CardHeader>
        <CardTitle>
          <h3>Apply Job on:</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <RadioGroup
            orientation='vertical'
            className={'grid-cols-3'}
            defaultValue='on-job-bucket'>
            {applyOptions.map((option, idx) => (
              <FieldLabel htmlFor={option.value} key={idx}>
                <Field orientation='horizontal'>
                  <FieldContent>
                    <FieldTitle className={'font-medium'}>
                      {option.title}
                    </FieldTitle>
                    <FieldDescription className={'text-sm'}>
                      {option.description}
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={option.value} id={option.value} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
