import { useFormContext } from 'react-hook-form';

import type { MoveFunnelStepProps } from '@/components/common/Funnel';
import type { EnterTitleStepFormValues } from '@/components/bookGroup/create/types';

import useRemoveVerticalScroll from '@/hooks/useRemoveVerticalScroll';

import { TitleField } from '@/components/bookGroup/create/steps/EnterTitleStep/fields';
import BottomActionButton from '@/components/common/BottomActionButton';

const EnterTitleStep = ({ onNextStep }: MoveFunnelStepProps) => {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<EnterTitleStepFormValues>();

  useRemoveVerticalScroll();

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
