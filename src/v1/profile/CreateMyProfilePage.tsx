import { Control, SubmitHandler, useForm, useWatch } from 'react-hook-form';

import type { APIAllJob } from '@/types/job';

import TopNavigation from '@/ui/Base/TopNavigation';
import Input from '@/ui/Base/Input';
import Select from '@/ui/Base/Select';
import ErrorMessage from '@/ui/Base/ErrorMessage';

const jobData: APIAllJob = {
  jobGroups: [
    {
      koreanName: '개발',
      name: 'DEVELOPMENT',
      jobs: [
        {
          koreanName: '백엔드 개발자',
          name: 'BACKEND_DEVELOPER',
          order: 1,
        },
        {
          koreanName: '프론트엔드 개발자',
          name: 'FRONTEND_DEVELOPER',
          order: 2,
        },
      ],
    },
  ],
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

const EditMyProfilePage = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
  });
  const jobGroups = jobData.jobGroups;

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
        <TopNavigation.CenterItem textAlign="center">
          <span className="text-md font-normal text-black-900">
            프로필 등록
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

      {/* 컨탠츠 컨테이너 */}
      <div className="mt-[9.2rem] flex w-full flex-col gap-[3.3rem]">
        {/* 프로필을 등록해주세요! */}
        <div className="flex flex-col gap-[1rem] font-normal">
          <span className="text-lg text-black-700">프로필을 등록해주세요!</span>
          <div className="text-sm text-placeholder">
            <p>프로필을 등록하면</p>
            <p>
              <span className="text-main-900">다독다독</span>이 추천하는 책장을
              볼 수 있어요.
            </p>
          </div>
        </div>

        {/* 폼 컨테이너 */}
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex w-full flex-col gap-[3.2rem]"
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