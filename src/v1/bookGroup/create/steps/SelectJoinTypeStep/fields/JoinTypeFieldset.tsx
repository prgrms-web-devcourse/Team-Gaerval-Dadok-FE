import { useFormContext } from 'react-hook-form';

import type { SelectJoinTypeStepFormValues } from '../../../types';
import type { JoinTypeStepFieldProp } from '../SelectJoinTypeStep';

import JoinTypeRadioCard from './JoinTypeRadioCard';

const JoinTypeFieldset = ({ children }: { children?: React.ReactNode }) => {
  return <fieldset className="flex flex-col gap-[1rem]">{children}</fieldset>;
};

const RadioCardField = ({ name }: JoinTypeStepFieldProp) => {
  const { register } = useFormContext<SelectJoinTypeStepFormValues>();

  return (
    <>
      <JoinTypeRadioCard
        {...register(name)}
        id="no-password"
        value="false"
        label="문제 없이 가입할 수 있어요"
      />
      <JoinTypeRadioCard
        {...register(name)}
        id="has-password"
        value="true"
        label="문제를 맞춰야 모임에 가입할 수 있어요"
      />
    </>
  );
};

JoinTypeFieldset.RadioCardField = RadioCardField;

export default JoinTypeFieldset;
