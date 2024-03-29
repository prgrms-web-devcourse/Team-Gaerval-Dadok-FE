'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { APIJobGroup } from '@/types/job';
import type { APIUser } from '@/types/user';

import { isAxiosError } from 'axios';
import useMyProfileMutation from '@/queries/user/useMyProfileMutation';

import { IconClose } from '@public/icons';

import TopNavigation from '@/v1/base/TopNavigation';
import Input from '@/v1/base/Input';
import InputLength from '@/v1/base/InputLength';
import Select from '@/v1/base/Select';
import ErrorMessage from '@/v1/base/ErrorMessage';
import useToast from '@/v1/base/Toast/useToast';

type UserProfileProps = {
  profile: Pick<APIUser, 'nickname' | 'job'>;
  jobGroups: APIJobGroup[];
};

type FormValues = {
  nickname: string;
  jobGroup: string;
  job: string;
};

const EditProfile = ({ profile, jobGroups }: UserProfileProps) => {
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

  const router = useRouter();
  const myProfileMutation = useMyProfileMutation();
  const toast = useToast();

  const showToastEditSuccess = () =>
    toast.show({
      type: 'success',
      message: '프로필 수정 완료!',
      duration: 3000,
    });

  const showToastEditFailed = () =>
    toast.show({
      type: 'error',
      message: '알 수 없는 에러가 발생했어요.',
      duration: 3000,
    });

  const handleSubmitForm: SubmitHandler<FormValues> = ({
    nickname,
    jobGroup,
    job,
  }) => {
    myProfileMutation.mutateAsync(
      {
        nickname,
        job: { jobGroup, jobName: job },
      },
      {
        onSuccess: () => {
          router.replace('/profile/me');
          showToastEditSuccess();
        },
        onError: error => {
          if (isAxiosError(error) && error.response) {
            console.error(error.response.data);
            showToastEditFailed();
          }
        },
      }
    );
  };

  return (
    <>
      <TopNavigation>
        <TopNavigation.LeftItem>
          <Link href="/profile/me" className="h-[2rem] w-[2rem] cursor-pointer">
            <IconClose className="fill-black-900" />
          </Link>
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
                currentLength={watch('nickname')?.length}
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

export default EditProfile;
