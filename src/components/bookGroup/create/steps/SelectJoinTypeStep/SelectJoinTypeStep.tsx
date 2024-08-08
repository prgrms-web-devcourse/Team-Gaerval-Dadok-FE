import { useFormContext } from 'react-hook-form';

import type { MoveFunnelStepProps } from '@/components/common/Funnel';
import type { SelectJoinTypeStepFormValues } from '@/components/bookGroup/create/types';

import {
  JoinPasswordFieldset,
  JoinTypeFieldset,
} from '@/components/bookGroup/create/steps/SelectJoinTypeStep/fields';
import StickyFooter from '@/components/common/StickyFooter';
import Button from '@/components/common/Button';

export type JoinTypeStepFieldName = keyof SelectJoinTypeStepFormValues;
export type JoinTypeStepFieldProp = { name: JoinTypeStepFieldName };

const SelectJoinTypeStep = ({ onPrevStep, onSubmit }: MoveFunnelStepProps) => {
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

      <StickyFooter>
        <Button
          colorScheme="grey"
          size="large"
          className="grow-[1]"
          onClick={onPrevStep}
        >
          이전
        </Button>
        <Button
          size="large"
          className="grow-[5]"
          onClick={onSubmit && handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          독서모임 만들기
        </Button>
      </StickyFooter>
    </article>
  );
};

export default SelectJoinTypeStep;
