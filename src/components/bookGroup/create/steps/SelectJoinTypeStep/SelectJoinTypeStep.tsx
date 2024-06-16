import { useFormContext } from 'react-hook-form';

import type { MoveFunnelStepProps } from '@/components/common/Funnel';
import type { SelectJoinTypeStepFormValues } from '@/components/bookGroup/create/types';

import {
  JoinPasswordFieldset,
  JoinTypeFieldset,
} from '@/components/bookGroup/create/steps/SelectJoinTypeStep/fields';
import BottomActionButton from '@/components/common/BottomActionButton';

export type JoinTypeStepFieldName = keyof SelectJoinTypeStepFormValues;
export type JoinTypeStepFieldProp = { name: JoinTypeStepFieldName };

const SelectJoinTypeStep = ({ onSubmit }: MoveFunnelStepProps) => {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<SelectJoinTypeStepFormValues>();

  return (
    <article className="pb-action-button">
      <h2 className="mb-[3rem] font-subheading-bold">
        가입은 어떻게 받을까요?
      </h2>

      <section className="flex flex-col gap-[2rem]">
        <JoinTypeFieldset>
          <JoinTypeFieldset.RadioCardField name="hasJoinPassword" />
        </JoinTypeFieldset>

        <JoinPasswordFieldset joinTypeFieldName="hasJoinPassword">
          <JoinPasswordFieldset.QuestionField name="joinQuestion" />
          <JoinPasswordFieldset.AnswerField name="joinPassword" />
        </JoinPasswordFieldset>
      </section>

      <BottomActionButton
        type="submit"
        disabled={!isValid}
        onClick={onSubmit && handleSubmit(onSubmit)}
      >
        독서모임 만들기
      </BottomActionButton>
    </article>
  );
};

export default SelectJoinTypeStep;
