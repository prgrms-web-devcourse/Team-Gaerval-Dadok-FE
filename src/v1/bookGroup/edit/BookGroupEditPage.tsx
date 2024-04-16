'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { getTodayDate } from '@/utils/date';

import BackButton from '@/v1/base/BackButton';
import DatePicker from '@/v1/base/DatePicker';
import ErrorMessage from '@/v1/base/ErrorMessage';
import Input from '@/v1/base/Input';
import InputLength from '@/v1/base/InputLength';
import TextArea from '@/v1/base/TextArea';
import TopNavigation from '@/v1/base/TopNavigation';

type GroupEditFormValues = {
  groupTitle: string;
  groupIntroduce: string;
  startDate: string;
  endDate: string;
};

const BookGroupEditPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupEditFormValues>({
    mode: 'all',
    defaultValues: {
      groupTitle: '프롱이 리팩터링 스터디',
      groupIntroduce: 'api 연결하자',
      startDate: getTodayDate(), // @todo api 받아오기
      endDate: getTodayDate(), // @todo api 받아오기
    },
  });

  const handleFormSubmit: SubmitHandler<GroupEditFormValues> = ({
    groupTitle,
    groupIntroduce,
    startDate,
    endDate,
  }) => {
    alert(
      `groupTitle: ${groupTitle}, groupIntroduce: ${groupIntroduce}, startDate: ${startDate}, endDate: ${endDate}`
    );
  };

  return (
    <>
      <TopNavigation>
        <TopNavigation.LeftItem>
          <BackButton />
        </TopNavigation.LeftItem>
        <TopNavigation.CenterItem>
          <h1 className="text-md text-black-900">모임 수정하기</h1>
        </TopNavigation.CenterItem>
        <TopNavigation.RightItem>
          <button
            onClick={handleSubmit(handleFormSubmit)}
            className="cursor-pointer font-bold text-main-900"
          >
            완료
          </button>
        </TopNavigation.RightItem>
      </TopNavigation>

      <form
        className="mt-[2.5rem] flex flex-col gap-[3.2rem]"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <section className="flex flex-col gap-[0.5rem]">
          <Input
            inputStyle="line"
            fontSize="large"
            {...register('groupTitle', {
              required: '모임 제목을 입력해주세요',
              minLength: {
                value: 2,
                message: '모임 제목을 2자 이상 입력해 주세요',
              },
              maxLength: {
                value: 30,
                message: '모임 제목을 30자 이하 입력해 주세요',
              },
            })}
          />
          <div className="flex flex-row-reverse items-center justify-between">
            <InputLength
              currentLength={watch('groupTitle')?.length}
              isError={!!errors.groupTitle}
              maxLength={30}
            />
            {errors.groupTitle && (
              <ErrorMessage>{errors.groupTitle.message}</ErrorMessage>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-[0.6rem]">
          <h2 className="text-md text-black-700">활동 내용</h2>
          <TextArea
            count={true}
            maxLength={500}
            {...register('groupIntroduce', {
              required: '모임 설명을 입력해주세요',
              minLength: {
                value: 10,
                message: '모임 설명을 10자 이상 입력해주세요',
              },
              maxLength: {
                value: 500,
                message: '모임 설명은 500자를 넘을 수 없어요',
              },
            })}
          >
            <ErrorMessage>{errors.groupIntroduce?.message}</ErrorMessage>
          </TextArea>
        </section>

        <section className="flex justify-between">
          <div>
            <h2 className="text-md text-black-500">모임 시작일</h2>
            <p className="text-xs text-placeholder">
              모임 시작일은 수정할 수 없어요
            </p>
          </div>
          <DatePicker
            disabled={true}
            {...register('startDate', {
              required: { value: true, message: '시작일을 입력해주세요' },
              min: {
                value: getTodayDate(), // @todo api 받아오기
                message: '시작일은 오늘부터 가능해요',
              },
            })}
          />
        </section>

        <section className="flex flex-col gap-[0.5rem]">
          <div className="flex justify-between">
            <h2 className="text-md text-black-700">모임 종료일</h2>
            <DatePicker
              {...register('endDate', {
                required: { value: true, message: '종료일을 입력해주세요' },
                min: {
                  value: getTodayDate(), // @todo api 받아오기
                  message: '종료일은 시작일보다 늦어야 해요',
                },
              })}
            />
          </div>
          <div>
            {errors.endDate && (
              <ErrorMessage>{errors.endDate.message}</ErrorMessage>
            )}
          </div>
        </section>
      </form>
    </>
  );
};

export default BookGroupEditPage;
