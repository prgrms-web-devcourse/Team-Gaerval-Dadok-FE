import { useFormContext, useWatch } from 'react-hook-form';

import type { EnterTitleStepFormValues } from '../../../types';

import ErrorMessage from '@/components/common/ErrorMessage';
import Input from '@/components/common/Input';
import InputLength from '@/components/common/InputLength';

type DefaultFieldNameProps = {
  name: keyof EnterTitleStepFormValues;
};

const TitleField = ({ name }: DefaultFieldNameProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EnterTitleStepFormValues>();

  const titleValue = useWatch({ control, name: name });
  const titleErrors = errors[name];

  return (
    <label htmlFor={name} className="flex flex-col gap-[0.5rem]">
      <Input
        id={name}
        placeholder="독서모임을 잘 표현할 수 있는 이름이면 좋아요."
        error={!!titleErrors}
        {...register(name, {
          required: '독서모임 이름을 작성해 주세요',
          minLength: { value: 2, message: '2글자 이상 입력해주세요' },
          maxLength: { value: 20, message: '20글자 이하로 입력해주세요' },
        })}
      />
      <div className="flex flex-row-reverse justify-between">
        <InputLength
          currentLength={titleValue.length}
          isError={!!titleErrors}
          maxLength={20}
        />
        <ErrorMessage>{titleErrors?.message}</ErrorMessage>
      </div>
    </label>
  );
};

export default TitleField;
