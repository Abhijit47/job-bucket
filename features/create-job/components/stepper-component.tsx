'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@/components/ui/stepper';
import { useStepperContext } from '@/contexts/stepper-context';
import { Card } from '../../../components/ui/card';
import RenderForms from './render-forms';

export default function StepperComponent() {
  const { currentStep, setCurrentStep, isLoading, onNextStep, steps } =
    useStepperContext();

  return (
    <div className='w-full space-y-8 text-center'>
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        {steps.map((step) => (
          <StepperItem
            key={step}
            step={step}
            className='not-last:flex-1'
            loading={isLoading}>
            <StepperTrigger asChild>
              <StepperIndicator />
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>

      <Card>
        <RenderForms />
      </Card>
      <div className='flex justify-center space-x-8'>
        <Button
          variant='outline'
          className='w-32'
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}>
          {isLoading ? <Spinner /> : 'Prev step'}
        </Button>
        <Button
          variant='outline'
          className='w-32'
          onClick={onNextStep}
          disabled={currentStep > steps.length - 1}>
          {isLoading ? <Spinner /> : 'Next step'}
        </Button>
      </div>
      {/* <p
        className='mt-2 text-xs text-muted-foreground'
        role='region'
        aria-live='polite'>
        Controlled stepper with checkmarks and loading state
      </p> */}
    </div>
  );
}
