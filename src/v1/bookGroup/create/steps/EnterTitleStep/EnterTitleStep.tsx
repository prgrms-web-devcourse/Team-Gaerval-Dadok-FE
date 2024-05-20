import { useFormContext } from 'react-hook-form';

import type { MoveFunnelStepProps } from '@/v1/base/Funnel';
import type { EnterTitleStepFormValues } from '../../types';

import BottomActionButton from '@/v1/base/BottomActionButton';
import { TitleField } from './fields';

const EnterTitleStep = ({ onNextStep }: MoveFunnelStepProps) => {
  const { handleSubmit } = useFormContext<EnterTitleStepFormValues>();

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
        onClick={handleSubmit(() => onNextStep?.())}
      >
        다음
      </BottomActionButton>
    </article>
  );
};

export default EnterTitleStep;
