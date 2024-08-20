import { PropsWithChildren } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { SelectJoinTypeStepFormValues } from '../../../types';
import type {
  JoinTypeStepFieldName,
  JoinTypeStepFieldProp,
} from '../SelectJoinTypeStep';

import ErrorMessage from '@/v1/base/ErrorMessage';
import Input from '@/v1/base/Input';
import InputLength from '@/v1/base/InputLength';
import withScrollLockOnFocus from '@/hocs/withScrollLockOnFocus';

type JoinPasswordFieldsetProps = {
  joinTypeFieldName: JoinTypeStepFieldName;
};

const JoinPasswordFieldset = ({
  joinTypeFieldName,
  children,
}: PropsWithChildren<JoinPasswordFieldsetProps>) => {
  const { control } = useFormContext<SelectJoinTypeStepFormValues>();
  const hasJoinPassword = useWatch({ control, name: joinTypeFieldName });

  const shouldRender = hasJoinPassword === 'true';

  return (
    <>
      {shouldRender && (
        <fieldset className="flex flex-col gap-[1.5rem]">{children}</fieldset>
      )}
    </>
  );
};

const ScrollLockInput = withScrollLockOnFocus(Input);

const JoinQuestionField = ({ name }: JoinTypeStepFieldProp) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SelectJoinTypeStepFormValues>();

  const joinQuestion = useWatch({ control, name });

  const questionLength = joinQuestion?.length;
  const error = errors[name];

  return (
    <label className="flex flex-col gap-[0.5rem]">
      <p>가입 문제</p>
      <ScrollLockInput
        placeholder="모임에 가입하기 위한 적절한 문제를 작성해주세요"
        {...register(name, {
          required: '1 ~ 30글자의 가입 문제가 필요해요',
          maxLength: {
            value: 30,
            message: '1 ~ 30글자의 가입 문제를 작성해주세요',
          },
        })}
        error={!!error}
      />
      <div className="flex flex-row-reverse justify-between">
        <InputLength
          currentLength={questionLength}
          isError={!!error}
          maxLength={30}
        />
        <ErrorMessage>{error?.message}</ErrorMessage>
      </div>
    </label>
  );
};

const JoinAnswerField = ({ name }: JoinTypeStepFieldProp) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SelectJoinTypeStepFormValues>();

  const joinPasswd = useWatch({ control, name });

  const passwordLength = joinPasswd?.length;
  const error = errors[name];

  return (
    <label className="flex flex-col gap-[0.5rem]">
      <p>정답</p>
      <ScrollLockInput
        placeholder="띄어쓰기 없이 정답을 작성해주세요"
        {...register(name, {
          required: '띄어쓰기 없이 10글자 이하의 정답이 필요해요',
          maxLength: {
            value: 10,
            message: '띄어쓰기 없이 10글자 이하의 정답을 작성해주세요,',
          },
          pattern: {
            value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]+$/,
            message: '띄어쓰기 없이 한글, 영어, 숫자만 입력할 수 있어요',
          },
        })}
        error={!!error}
      />
      <div className="flex flex-row-reverse justify-between">
        <InputLength
          currentLength={passwordLength}
          isError={!!error}
          maxLength={10}
        />
        <ErrorMessage>{error?.message}</ErrorMessage>
      </div>
    </label>
  );
};

JoinPasswordFieldset.QuestionField = JoinQuestionField;
JoinPasswordFieldset.AnswerField = JoinAnswerField;

export default JoinPasswordFieldset;
