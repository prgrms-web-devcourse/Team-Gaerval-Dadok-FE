import { useFormContext } from 'react-hook-form';

import type { MoveFunnelStepProps } from '@/v1/base/Funnel';
import type { EnterTitleStepFormValues } from '@/v1/bookGroup/create/types';

import useRemoveVerticalScroll from '@/hooks/useRemoveVerticalScroll';

import { TitleField } from '@/v1/bookGroup/create/steps/EnterTitleStep/fields';
import BottomActionButton from '@/v1/base/BottomActionButton';

const EnterTitleStep = ({ onNextStep }: MoveFunnelStepProps) => {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<EnterTitleStepFormValues>();

  useRemoveVerticalScroll();

  return (
    <article>
      <section className="flex flex-col gap-[1.5rem]">
        <h2 className="text-black-700 font-subheading-bold">
          독서모임 이름을 적어주세요
        </h2>
        <TitleField name="title" />
      </section>

      <BottomActionButton
        type="submit"
        disabled={!isValid}
        onClick={handleSubmit(() => onNextStep?.())}
      >
        다음
      </BottomActionButton>
    </article>
  );
};

export default EnterTitleStep;
