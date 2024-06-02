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
      return 'bg-main-900 w-[7.4rem] delay-[400]';
    case 'incomplete':
    default:
      return 'bg-main-500';
  }
};

const Step = ({
  label,
  children,
}: {
  label?: string;
  children?: ReactNode;
}) => {
  const { status, index } = useContext(StepperContext);
  const statusClasses = getStepClasses(status);
  const activeAnimationClasses =
    index !== 0 ? 'opacity-0 animate-stepper-transition' : 'opacity-1';

  const stepNumberToRender = index + 1;
  const labelToRender = label ? label : stepNumberToRender;

  return (
    <div
      className={`relative flex h-[3rem] w-[3rem] shrink-0 flex-col items-center justify-center rounded-full duration-500 ${statusClasses} overflow-hidden`}
    >
      {status === 'complete' ? (
        <IconCheckStroke className="h-auto w-[1rem]" />
      ) : status === 'active' ? (
        <p
          className={`relative self-baseline whitespace-nowrap px-[1.2rem] py-[0.4rem] text-white font-body2-bold ${activeAnimationClasses}`}
        >
          {labelToRender}
        </p>
      ) : (
        <p className="relaive text-white font-body2-bold">
          {stepNumberToRender}
        </p>
      )}
      {children}
    </div>
  );
};

Stepper.Step = Step;

export default Stepper;
