'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { APIJobGroup } from '@/types/job';

import { isAxiosError } from 'axios';
import useMyProfileMutation from '@/queries/user/useMyProfileMutation';

import TopNavigation from '@/components/common/TopNavigation';
import Input from '@/components/common/Input';
import InputLength from '@/components/common/InputLength';
import Select from '@/components/common/Select';
import ErrorMessage from '@/components/common/ErrorMessage';
import useToast from '@/components/common/Toast/useToast';

type AddJobProfileProps = {
  jobCategories: APIJobGroup[];
};

type FormValues = {
  nickname: string;
  jobGroup: string;
  job: string;
};

const AddJobProfile = ({ jobCategories }: AddJobProfileProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      nickname: '',
      jobGroup: '',
      job: '',
    },
  });

  const router = useRouter();
  const myProfileMutation = useMyProfileMutation();
  const toast = useToast();

  const showToastEditSuccess = () =>
    toast.show({
      type: 'success',
      message: '프로필을 등록했어요!',
      duration: 3000,
    });

  /**
   * @todo
   * showToastEditFailed()
   * 범용적으로 에러 핸들링 할 수 있도록 수정
   */

  const showToastEditFailed = () =>
    toast.show({
      type: 'error',
      message: '잠시 후 다시 시도해 주세요',
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
        job: { jobGroup: jobGroup, jobName: job },
      },
      {
        onSuccess: () => {
          router.replace('/bookarchive');
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
        <TopNavigation.CenterItem textAlign="center">
          <p className="text-black-900 font-body1-regular">프로필 등록</p>
        </TopNavigation.CenterItem>
        <TopNavigation.RightItem>
          <button
            onClick={handleSubmit(handleSubmitForm)}
            className="text-main-900 font-body1-bold"
          >
            완료
          </button>
        </TopNavigation.RightItem>
      </TopNavigation>

      <div className="mt-[3.8rem] flex w-full flex-col gap-[3.3rem]">
        <div className="flex flex-col gap-[1rem]">
          <span className="text-black-700 font-subheading-bold">
            프로필을 등록해주세요!
          </span>
          <div className="text-placeholder font-body2-regular">
            <p>프로필을 등록하면</p>
            <p>
              <span className="text-main-900">다독다독</span>이 추천하는 책장을
              볼 수 있어요.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex w-full flex-col gap-[3.2rem]"
        >
          <div className="flex flex-col gap-[1rem]">
            <p className="text-black-700">닉네임</p>
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
            <p className="text-black-700">직업/직군</p>

            <div className="flex flex-col gap-[0.5rem]">
              <Select
                placeholder="직군을 선택해주세요."
                {...register('jobGroup', {
                  required: '직군을 선택해주세요.',
                })}
                error={!!errors.jobGroup}
              >
                {jobCategories.map(({ name, koreanName }) => (
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
                {jobCategories
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
    </>
  );
};

export default AddJobProfile;
