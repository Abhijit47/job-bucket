import { useStepperContext } from '@/contexts/stepper-context';
import BasicDetails from './basic-job-details';

export default function RenderForms() {
  const { currentStep } = useStepperContext();

  switch (currentStep) {
    case 1:
      return <BasicDetails />;
    case 2:
      return <div>Step 2 Form</div>;
    case 3:
      return <div>Step 3 Form</div>;
    case 4:
      return <div>Step 4 Form</div>;
  }
}
