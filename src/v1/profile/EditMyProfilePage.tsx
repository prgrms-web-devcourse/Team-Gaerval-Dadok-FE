import { Control, SubmitHandler, useForm, useWatch } from 'react-hook-form';

import type { APIJobGroup } from '@/types/job';
import type { APIUser } from '@/types/user';

import { IconClose } from '@public/icons';

import TopNavigation from '@/ui/Base/TopNavigation';
import Input from '@/ui/Base/Input';
import Select from '@/ui/Base/Select';
import ErrorMessage from '@/ui/Base/ErrorMessage';

type UserProfileProps = {
  profile: Pick<APIUser, 'nickname' | 'job'>;
  jobGroups: APIJobGroup[];
};

type FormValues = {
  nickname: string;
  jobGroup: string;
  job: string;
};

type InputLengthProps = {
  control: Control<FormValues>;
  keyNames: keyof FormValues;
  minLength: number;
  maxLength: number;
};

const EditMyProfilePage = ({ profile, jobGroups }: UserProfileProps) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      nickname: profile.nickname || '',
      jobGroup: profile.job.jobGroupName || '',
      job: profile.job.jobName || '',
    },
  });

  const handleSubmitForm: SubmitHandler<FormValues> = ({
    nickname,
    jobGroup,
    job,
  }) => {
    return alert(`닉네임: ${nickname}, 직군: ${jobGroup}, 직업: ${job}`);
  };

  return (
    /* 공통 레이아웃 스타일링, 추후 제거할 것 */
    <div
      className={`animate-page-transition h-screen w-full max-w-[43rem] overflow-auto p-[2rem]`}
    >
      {/* 헤더 부분 */}
      <TopNavigation>
        <TopNavigation.LeftItem>
          <IconClose className="h-[2rem] w-[2rem] cursor-pointer fill-black-900" />
        </TopNavigation.LeftItem>
        <TopNavigation.CenterItem textAlign="center">
          <span className="text-md font-normal text-black-900">
            프로필 수정
          </span>
        </TopNavigation.CenterItem>
        <TopNavigation.RightItem>
          <span
            onClick={handleSubmit(handleSubmitForm)}
            className="cursor-pointer text-md font-bold text-main-900"
          >
            완료
          </span>
        </TopNavigation.RightItem>
      </TopNavigation>

      {/* 폼 컨테이너 */}
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="mt-[9.2rem] flex w-full flex-col gap-[3.2rem]"
      >
        {/* 닉네임 입력 폼 */}
        <div className="flex flex-col gap-[1rem]">
          <span className="h-[2.1rem] text-md font-normal text-black-700">
            닉네임
          </span>
          <div className="flex flex-col gap-[0.5rem]">
            <Input
              placeholder="닉네임을 입력해주세요."
              {...register('nickname', {
                required: '닉네임을 입력해주세요.',
                minLength: { value: 2, message: '2자 이상 입력해 주세요.' },
                maxLength: { value: 10, message: '10자 이하 입력해 주세요.' },
              })}
              error={!!errors.nickname}
            />
            <div className="flex h-[1.4rem] flex-row-reverse justify-between">
              <InputLength
                control={control}
                keyNames={'nickname'}
                minLength={2}
                maxLength={10}
              />
              {errors.nickname && (
                <ErrorMessage>{errors.nickname.message}</ErrorMessage>
              )}
            </div>
          </div>
        </div>

        {/* 직업 직군 입력 폼 */}
        <div className="flex flex-col gap-[1rem]">
          <span className="h-[2.1rem] text-md font-normal text-black-700">
            직업/직군
          </span>

          {/* 직군 선택 폼 */}
          <div className="flex flex-col gap-[0.5rem]">
            <Select
              placeholder="직군을 선택해주세요."
              {...register('jobGroup', {
                required: '직군을 선택해주세요.',
              })}
              error={!!errors.jobGroup}
            >
              {jobGroups.map(({ name, koreanName }) => (
                <Select.Option key={name} value={name}>
                  {koreanName}
                </Select.Option>
              ))}
            </Select>
            {errors.jobGroup && (
              <ErrorMessage>{errors.jobGroup.message}</ErrorMessage>
            )}
          </div>

          {/* 직업 선택 폼 */}
          <div className="flex flex-col gap-[0.5rem]">
            <Select
              placeholder="직업을 선택해주세요."
              {...register('job', {
                required: '직업을 선택해주세요.',
              })}
              error={!!errors.job}
            >
              {jobGroups
                .find(({ name }) => name === watch('jobGroup'))
                ?.jobs.map(({ name, koreanName }) => (
                  <Select.Option key={name} value={name}>
                    {koreanName}
                  </Select.Option>
                ))}
            </Select>
            {errors.job && <ErrorMessage>{errors.job.message}</ErrorMessage>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMyProfilePage;

const InputLength = ({
  control,
  keyNames,
  minLength,
  maxLength,
}: InputLengthProps) => {
  const targetInput = useWatch({
    control,
    name: keyNames,
  });

  const currentLength = targetInput ? targetInput.length : 0;
  const isError = currentLength < minLength || currentLength > maxLength;
  const textColor = isError ? 'text-warning-800 ' : 'text-main-900';

  return (
    <div>
      <span className={textColor}>{currentLength}</span>/{maxLength}
    </div>
  );
};
