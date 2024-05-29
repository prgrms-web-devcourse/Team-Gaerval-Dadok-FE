import {
  Children,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
} from 'react';

import { IconCheckStroke } from '@public/icons';
import ProgressBar from '@/v1/base/ProgressBar';

type StepStatus = 'complete' | 'incomplete' | 'active';

type StepContextValues = {
  index: number;
  status: StepStatus;
  count: number;
};

const StepperContext = createContext<StepContextValues>(
  {} as StepContextValues
);

const Stepper = ({
  activeIndex,
  children,
}: PropsWithChildren<{ activeIndex: number }>) => {
  const stepElements = Children.toArray(children);
  const stepCount = stepElements.length;

  const progressPercent =
    activeIndex === 0 ? 0 : Math.ceil((activeIndex / (stepCount - 1)) * 100);

  const getStepStatus = (step: number): StepStatus => {
    if (step < activeIndex) return 'complete';
    if (step > activeIndex) return 'incomplete';
    return 'active';
  };

  return (
    <div className="relative z-[1] flex w-full items-center justify-between">
      <ProgressBar value={progressPercent} className="-z-[1]" />
      {stepElements.map((child, index) => (
        <StepperContext.Provider
          key={index}
          value={{ index, status: getStepStatus(index), count: stepCount }}
        >
          {child}
        </StepperContext.Provider>
      ))}
    </div>
  );
};

const getStepClasses = (status: StepStatus) => {
  switch (status) {
    case 'complete':
      return 'bg-main-900';
    case 'active':
      return 'bg-main-900 scale-[1.3] delay-500';
    case 'incomplete':
    default:
      return 'bg-main-500';
  }
};

const Step = ({ children }: { children?: ReactNode }) => {
  const { status, index } = useContext(StepperContext);
  const statusClasses = getStepClasses(status);

  return (
    <div
      className={`relative flex h-[1.8rem] w-[1.8rem] shrink-0 flex-col items-center justify-center rounded-full duration-500 ${statusClasses}`}
    >
      {status === 'complete' ? (
        <IconCheckStroke className="h-auto w-[1rem]" />
      ) : (
        <p className="absolute text-white font-caption2-bold">{index + 1}</p>
      )}
      {children}
    </div>
  );
};

Stepper.Step = Step;

export default Stepper;
