'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface StepperContextProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  onNextStep: () => void;
  steps: number[];
}

const StepperContext = createContext<StepperContextProps>({
  currentStep: 2,
  setCurrentStep: () => {},
  isLoading: false,
  setIsLoading: () => {},
  onNextStep: () => {},
  steps: [1, 2, 3, 4],
});

export function StepperProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const steps = [1, 2, 3, 4];

  const handleNextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isLoading,
        setIsLoading,
        onNextStep: handleNextStep,
        steps,
      }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepperContext must be used within a StepperProvider');
  }
  return context;
}
