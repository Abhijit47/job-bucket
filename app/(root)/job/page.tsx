import { Card, CardContent } from '@/components/ui/card';
import { StepperProvider } from '@/contexts/stepper-context';
import StepperComponent from '@/features/create-job/components/stepper-component';

export default function CreateJob() {
  return (
    <div className={'max-w-[85em] mx-auto px-4 py-16'}>
      <Card className={'gap-2'}>
        <CardContent>
          <StepperProvider>
            <StepperComponent />
          </StepperProvider>
        </CardContent>
      </Card>
    </div>
  );
}
