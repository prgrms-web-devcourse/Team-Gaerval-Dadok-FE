import { useFormContext } from 'react-hook-form';

import {
  JoinTypeStepFormValues,
  JoinTypeStepFieldProp,
} from '../SelectJoinTypeStep';

import JoinTypeRadioCard from './JoinTypeRadioCard';

const JoinTypeFieldset = ({ name }: JoinTypeStepFieldProp) => {
  const { register } = useFormContext<JoinTypeStepFormValues>();

  return (
    <fieldset className="flex flex-col gap-[1rem]">
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
    </fieldset>
  );
};

export default JoinTypeFieldset;
