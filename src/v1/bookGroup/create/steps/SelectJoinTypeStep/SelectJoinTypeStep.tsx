import { useFormContext } from 'react-hook-form';

import BottomActionButton from '@/v1/base/BottomActionButton';

import { JoinPasswordFieldset, JoinTypeFieldset } from './fields';

interface MoveFunnelStepProps {
  onPrevStep?: () => void;
  onNextStep?: () => void;
  onSubmit?: () => void;
}

export type JoinTypeStepFormValues = {
  hasJoinPasswd: 'true' | 'false';
  joinQuestion?: string;
  joinPasswd?: string;
};

export type JoinTypeStepFieldName = keyof JoinTypeStepFormValues;
export type JoinTypeStepFieldProp = { name: JoinTypeStepFieldName };

const SelectJoinTypeStep = ({ onSubmit }: MoveFunnelStepProps) => {
  const { handleSubmit } = useFormContext<JoinTypeStepFormValues>();

  return (
    <article>
      <h2 className="mb-[3rem] text-lg font-bold">가입은 어떻게 받을까요?</h2>

      <section className="flex flex-col gap-[2rem]">
        <JoinTypeFieldset>
          <JoinTypeFieldset.RadioCardField name="hasJoinPasswd" />
        </JoinTypeFieldset>

        <JoinPasswordFieldset joinTypeFieldName="hasJoinPasswd">
          <JoinPasswordFieldset.QuestionField name="joinQuestion" />
          <JoinPasswordFieldset.AnswerField name="joinPasswd" />
        </JoinPasswordFieldset>
      </section>

      <BottomActionButton
        type="submit"
        onClick={onSubmit && handleSubmit(onSubmit)}
      >
        독서모임 만들기
      </BottomActionButton>
    </article>
  );
};

export default SelectJoinTypeStep;
