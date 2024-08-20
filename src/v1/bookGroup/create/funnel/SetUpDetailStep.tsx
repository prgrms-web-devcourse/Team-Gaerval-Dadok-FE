import { useFormContext } from 'react-hook-form';

import type { APICreateGroup } from '@/types/group';

import { getTodayDate } from '@/utils/date';
import { MAX_MEMBER_COUNT_OPTIONS } from '@/constants';

import BottomActionButton from '@/v1/base/BottomActionButton';
import DatePicker from '@/v1/base/DatePicker';
import ErrorMessage from '@/v1/base/ErrorMessage';
import Input from '@/v1/base/Input';
import InputLength from '@/v1/base/InputLength';
import RadioButton from '@/v1/base/RadioButton';
import Switch from '@/v1/base/Switch';
import TextArea from '@/v1/base/TextArea';
import BookInfoCard from '../../BookInfoCard';

interface MoveFunnelStepProps {
  onPrevStep?: () => void;
  onNextStep?: () => void;
  onSubmit?: () => void;
}

interface SetUpDetailStepValues
  extends Pick<
    APICreateGroup,
    'bookId' | 'title' | 'introduce' | 'startDate' | 'endDate' | 'isPublic'
  > {
  maxMemberCount: string;
  customMemberCount: string;
}

const SetUpDetailStep = ({
  // FIXME: goToSelectBookStep,
  onNextStep,
}: MoveFunnelStepProps) => {
  const { handleSubmit, getValues } = useFormContext<SetUpDetailStepValues>();

  return (
    <article className="flex flex-col gap-[3.2rem] overflow-y-scroll pb-[7rem]">
      <TitleField name={'title'} />
      <SelectedBookInfoField bookId={getValues('bookId')} />

      <IntroduceField name={'introduce'} />
      <section className="flex flex-col gap-[1.6rem]">
        <MaxMemberCountField name={'maxMemberCount'} />
        <CustomMemberCountField name={'customMemberCount'} />
      </section>

      <PickStartDateField name={'startDate'} />
      <PickEndDateField name={'endDate'} />

      <SwitchIsPublicField name={'isPublic'} />

      <BottomActionButton
        type="submit"
        onClick={handleSubmit(() => onNextStep?.())}
      >
        다음
      </BottomActionButton>
    </article>
  );
};

export default SetUpDetailStep;

type SetUpDetailFieldProps = {
  name: keyof SetUpDetailStepValues;
};

const TitleField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<SetUpDetailStepValues>();

  const watchedName = watch(name);
  const currentLength =
    typeof watchedName === 'string' ? watchedName.length : 0;

  const titleErrors = errors[name];

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <Input
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
          currentLength={currentLength}
          maxLength={20}
          isError={!!titleErrors}
        />
        <ErrorMessage>{titleErrors?.message}</ErrorMessage>
      </div>
    </section>
  );
};

const SelectedBookInfoField = ({ bookId }: { bookId?: number }) => {
  return (
    <section>
      <BookInfoCard bookId={bookId} removable={true} />
    </section>
  );
};

const IntroduceField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SetUpDetailStepValues>();

  const introduceErrors = errors[name];

  return (
    <section className="flex flex-col gap-[1.6rem]">
      <h2>활동 내용</h2>
      <TextArea
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
      </TextArea>
    </section>
  );
};

const MaxMemberCountField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SetUpDetailStepValues>();

  const maxMemberCountErrors = errors[name];

  return (
    <>
      <h2>최대 인원</h2>
      <div className="inline-flex w-[23rem] flex-wrap gap-[1rem]">
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
      </div>
      <ErrorMessage>{maxMemberCountErrors?.message}</ErrorMessage>
    </>
  );
};

const CustomMemberCountField = ({ name }: SetUpDetailFieldProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<SetUpDetailStepValues>();

  const customMemberCountErrors = errors[name];
  const isCustomInputCount = watch('maxMemberCount') === 'custom';

  return (
    <>
      {isCustomInputCount && (
        <div className="flex flex-col gap-[0.5rem]">
          <Input
            type="number"
            placeholder="1000명 이상의 인원은 제한 없음을 선택해주세요"
            {...register(name, {
              required: {
                value: isCustomInputCount,
                message: '모임 최대 인원을 입력해주세요',
              },
              min: { value: 2, message: '모임 인원은 최소 2명부터 가능해요' },
              max: { value: 1000, message: '1000 이하의 값을 입력해주세요' },
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
    formState: { errors },
  } = useFormContext<SetUpDetailStepValues>();

  const startDateErrors = errors[name];

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <div className="flex items-center justify-between">
        <h2>모임 시작일</h2>
        <DatePicker
          {...register(name, {
            required: '모임 시작일을 선택해주세요',
            min: {
              value: getTodayDate(),
              message: '모임 시작일은 오늘 혹은 그 이후로 선택해주세요',
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
    watch,
    formState: { errors },
  } = useFormContext<SetUpDetailStepValues>();

  const endDateErrors = errors[name];

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <div className="flex items-center justify-between">
        <h2>모임 종료일</h2>
        <DatePicker
          {...register(name, {
            required: '모임 종료일을 선택해주세요',
            min: {
              value: watch('startDate'),
              message: '모임 종료일은 시작일보다 늦어야해요',
            },
          })}
        />
      </div>
      <ErrorMessage>{endDateErrors?.message}</ErrorMessage>
    </section>
  );
};

const SwitchIsPublicField = ({ name }: SetUpDetailFieldProps) => {
  const { register } = useFormContext<SetUpDetailStepValues>();

  return (
    <section className="flex items-start justify-between">
      <div className="flex min-w-0 flex-col gap-[0.3rem]">
        <h2>댓글 공개 여부</h2>
        <p className="text-xs text-placeholder">
          모임에 가입하지 않은 사람도 댓글을 볼 수 있어요.
        </p>
      </div>
      <Switch {...register(name)} />
    </section>
  );
};
