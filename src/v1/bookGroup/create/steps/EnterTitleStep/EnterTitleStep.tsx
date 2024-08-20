import { useFormContext } from 'react-hook-form';

import BottomActionButton from '@/v1/base/BottomActionButton';
import { TitleField } from './fields';

interface MoveFunnelStepProps {
  onNextStep?: () => void;
}

export interface EnterTitleStepValues {
  title: string;
}

const EnterTitleStep = ({ onNextStep }: MoveFunnelStepProps) => {
  const { handleSubmit } = useFormContext<EnterTitleStepValues>();

  return (
    <article>
      <section className="flex flex-col gap-[1.5rem]">
        <h2 className="text-lg font-bold text-black-700">
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
