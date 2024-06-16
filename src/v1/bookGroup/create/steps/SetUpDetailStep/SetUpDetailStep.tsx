import { useFormContext, useWatch } from 'react-hook-form';

import type { MoveFunnelStepProps } from '@/v1/base/Funnel';
import type { SetUpDetailStepFormValues } from '../../types';

import { MAX_MEMBER_COUNT_OPTIONS } from '@/constants';
import { getTodayDate } from '@/utils/date';

import withScrollLockOnFocus from '@/hocs/withScrollLockOnFocus';
import BottomActionButton from '@/v1/base/BottomActionButton';
import DatePicker from '@/v1/base/DatePicker';
import ErrorMessage from '@/v1/base/ErrorMessage';
import Input from '@/v1/base/Input';
import InputLength from '@/v1/base/InputLength';
import RadioButton from '@/v1/base/RadioButton';
import Switch from '@/v1/base/Switch';
import TextArea from '@/v1/base/TextArea';
import BookInfoCard from '@/v1/bookGroup/BookInfoCard';

interface SetUpDetailStepProps extends MoveFunnelStepProps {
  goToSelectBookStep?: () => void;
}

/**
 * @todo
 * Field 컴포넌트 분리
 */

const SetUpDetailStep = ({
  goToSelectBookStep,
  onNextStep,
}: SetUpDetailStepProps) => {
  const {
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useFormContext<SetUpDetailStepFormValues>();

  return (
    <article className="flex flex-col gap-[2.5rem] overflow-y-scroll pb-[calc(env(safe-area-inset-bottom)+7rem)]">
      <h2 className="font-subheading-bold">모임 정보를 설정해주세요</h2>
      <TitleField name={'title'} />
      <SelectedBookInfoField
        bookId={getValues('book.bookId')}
        onRemoveButtonClick={goToSelectBookStep}
      />
      <IntroduceField name={'introduce'} />

      <section className="flex flex-col gap-[1.5rem] pb-[1rem]">
        <MaxMemberCountField name={'maxMemberCount'} />
        <CustomMemberCountField name={'customMemberCount'} />
      </section>

      <PickStartDateField name={'startDate'} />
      <PickEndDateField name={'endDate'} />

      <SwitchIsPublicField name={'isPublic'} />

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

export default SetUpDetailStep;

type SetUpDetailFieldProps = {
  name: keyof SetUpDetailStepFormValues;
};

const ScrollLockInput = withScrollLockOnFocus(Input);

const TitleField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SetUpDetailStepFormValues>();

  const titleValue = useWatch({ control, name: name });
  const titleValueLength =
    typeof titleValue === 'string' ? titleValue.length : 0;
  const titleErrors = errors[name];

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <ScrollLockInput
        fontSize="large"
        inputStyle="line"
        error={!!titleErrors}
        {...register(name, {
          required: '독서모임 이름을 적어주세요',
          minLength: { value: 2, message: '2글자 이상 입력해주세요' },
          maxLength: { value: 20, message: '20글자 이하로 입력해주세요' },
        })}
      />
      <div className="flex flex-row-reverse justify-between gap-[0.4rem]">
        <InputLength
          currentLength={titleValueLength}
          maxLength={20}
          isError={!!titleErrors}
        />
        <ErrorMessage>{titleErrors?.message}</ErrorMessage>
      </div>
    </section>
  );
};

const SelectedBookInfoField = ({
  bookId,
  onRemoveButtonClick,
}: {
  bookId?: number;
  onRemoveButtonClick?: () => void;
}) => {
  const { reset } = useFormContext<SetUpDetailStepFormValues>();

  const handleBookRemove = () => {
    onRemoveButtonClick?.();
    reset({ book: undefined });

    return;
  };

  return (
    <section>
      <BookInfoCard
        bookId={bookId}
        onBookRemove={handleBookRemove}
        removable={true}
      />
    </section>
  );
};

const ScrollLockTextArea = withScrollLockOnFocus(TextArea);

const IntroduceField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SetUpDetailStepFormValues>();

  const introduceErrors = errors[name];

  return (
    <section className="flex flex-col gap-[1.2rem]">
      <h2>활동 내용</h2>
      <ScrollLockTextArea
        count={true}
        error={!!introduceErrors}
        placeholder="독서모임에서 어떤 활동을 할 계획인지 자세히 설명해주세요"
        {...register(name, {
          required: '독서모임에 대한 설명을 적어주세요',
          minLength: { value: 10, message: '10글자 이상 입력해주세요' },
          maxLength: { value: 500, message: '500자 이하로 입력해주세요' },
        })}
      >
        <ErrorMessage>{introduceErrors?.message}</ErrorMessage>
      </ScrollLockTextArea>
    </section>
  );
};

const MaxMemberCountField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SetUpDetailStepFormValues>();

  const maxMemberCountErrors = errors[name];

  return (
    <>
      <h2>최대 인원</h2>
      <fieldset className="inline-flex w-[80%] flex-wrap gap-[1.2rem]">
        {MAX_MEMBER_COUNT_OPTIONS.map(option => (
          <RadioButton
            key={option.value}
            value={option.value}
            label={option.label}
            {...register(name, {
              required: '모임 최대 인원을 선택해 주세요',
            })}
          />
        ))}
      </fieldset>
      <ErrorMessage>{maxMemberCountErrors?.message}</ErrorMessage>
    </>
  );
};

const CustomMemberCountField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SetUpDetailStepFormValues>();

  const maxMemberCount = useWatch({ control, name: 'maxMemberCount' });
  const isCustomInputCount = maxMemberCount === 'custom';
  const customMemberCountErrors = errors[name];

  return (
    <>
      {isCustomInputCount && (
        <div className="flex flex-col gap-[0.5rem]">
          <Input
            type="number"
            min={0}
            placeholder="최대인원을 입력해주세요"
            className="after:content-['명']"
            error={!!customMemberCountErrors}
            {...register(name, {
              required: {
                value: isCustomInputCount,
                message: '모임 최대 인원을 입력해주세요',
              },
              min: { value: 2, message: '모임 인원은 최소 2명부터 가능해요' },
              max: {
                value: 1000,
                message: '1000명 이상의 인원은 제한 없음을 선택해주세요',
              },
            })}
          />
          <ErrorMessage>{customMemberCountErrors?.message}</ErrorMessage>
        </div>
      )}
    </>
  );
};

const PickStartDateField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SetUpDetailStepFormValues>();

  const startDateErrors = errors[name];
  const endDate = useWatch({ control, name: 'endDate' });
  const todayDate = getTodayDate();

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <div className="flex items-center justify-between">
        <h2>모임 시작일</h2>
        <DatePicker
          {...register(name, {
            required: '모임 시작일을 선택해주세요',
            min: {
              value: todayDate,
              message: '모임 시작일은 오늘 혹은 그 이후로 선택해주세요',
            },
            max: {
              value: endDate,
              message: '모임 시작일은 종료일 보다 빨라야해요',
            },
          })}
        />
      </div>
      <ErrorMessage>{startDateErrors?.message}</ErrorMessage>
    </section>
  );
};

const PickEndDateField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SetUpDetailStepFormValues>();

  const startDate = useWatch({ control, name: 'startDate' });
  const todayDate = getTodayDate();

  const endDateErrors = errors[name];

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <div className="flex items-center justify-between">
        <h2>모임 종료일</h2>
        <DatePicker
          {...register(name, {
            required: '모임 종료일을 선택해주세요',
            min: {
              value: startDate || todayDate,
              message: '모임 종료일은 시작일과 오늘 이후여야 해요',
            },
          })}
        />
      </div>
      <ErrorMessage>{endDateErrors?.message}</ErrorMessage>
    </section>
  );
};

const SwitchIsPublicField = ({ name }: SetUpDetailFieldProps) => {
  const { register, control } = useFormContext<SetUpDetailStepFormValues>();

  const isCommentPublic = useWatch({ control, name });

  return (
    <section className="flex items-center justify-between">
      <div className="flex min-w-0 flex-col gap-[0.3rem]">
        <h2>댓글 공개 여부</h2>
        <p className="text-placeholder font-caption1-regular">
          {isCommentPublic
            ? '모임에 가입하지 않아도 댓글을 볼 수 있어요'
            : '모임에 가입해야 댓글을 볼 수 있어요'}
        </p>
      </div>
      <Switch {...register(name)} />
    </section>
  );
};
