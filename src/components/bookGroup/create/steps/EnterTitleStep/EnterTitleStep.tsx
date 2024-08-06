import { useFormContext } from 'react-hook-form';

import type { MoveFunnelStepProps } from '@/components/common/Funnel';
import type { EnterTitleStepFormValues } from '@/components/bookGroup/create/types';

import useRemoveVerticalScroll from '@/hooks/useRemoveVerticalScroll';

import { TitleField } from '@/components/bookGroup/create/steps/EnterTitleStep/fields';
import StickyFooter from '@/components/common/StickyFooter';
import Button from '@/components/common/Button';

const EnterTitleStep = ({ onPrevStep, onNextStep }: MoveFunnelStepProps) => {
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
          onClick={handleSubmit(() => onNextStep?.())}
          disabled={!isValid}
        >
          다음
        </Button>
      </StickyFooter>
    </article>
  );
};

export default EnterTitleStep;
