import { SubmitHandler, useForm } from 'react-hook-form';

import type { APIJobGroup } from '@/types/job';
import type { APIUser } from '@/types/user';

import { IconClose } from '@public/icons';

import TopNavigation from '@/ui/Base/TopNavigation';
import Input from '@/ui/Base/Input';
import InputLength from '@/ui/Base/InputLength';
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

const EditMyProfile = ({ profile, jobGroups }: UserProfileProps) => {
  const {
    register,
    watch,
    handleSubmit,
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

  const handleCloseButton = () => {
    return alert('뒤로 가기');
  };

  return (
    <>
      <TopNavigation>
        <TopNavigation.LeftItem>
          <IconClose
            onClick={handleCloseButton}
            className="h-[2rem] w-[2rem] cursor-pointer fill-black-900"
          />
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

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="mt-[9.2rem] flex w-full flex-col gap-[3.2rem]"
      >
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
                currentValue={watch('nickname')}
                isError={!!errors.nickname}
                maxLength={10}
              />
              {errors.nickname && (
                <ErrorMessage>{errors.nickname.message}</ErrorMessage>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[1rem]">
          <span className="h-[2.1rem] text-md font-normal text-black-700">
            직업/직군
          </span>

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
    </>
  );
};

export default EditMyProfile;
