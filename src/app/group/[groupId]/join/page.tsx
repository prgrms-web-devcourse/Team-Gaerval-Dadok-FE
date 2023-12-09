'use client';

import { notFound } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import groupAPI from '@/apis/group';
import useToast from '@/v1/base/Toast/useToast';
import { useBookGroupJoinInfo } from '@/queries/group/useBookGroupQuery';
import { isAxiosErrorWithCustomCode } from '@/utils/helpers';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import Input from '@/v1/base/Input';
import InputLength from '@/v1/base/InputLength';
import ErrorMessage from '@/v1/base/ErrorMessage';
import BottomActionButton from '@/v1/base/BottomActionButton';
import BookGroupNavigation from '@/v1/bookGroup/BookGroupNavigation';

type JoinFormValues = {
  answer: string;
};

const BookGroupJoinPage = ({
  params: { groupId },
}: {
  params: { groupId: number };
}) => {
  return (
    <SSRSafeSuspense>
      <BookGroupNavigation groupId={groupId}>
        <BookGroupNavigation.BackButton />
        <BookGroupNavigation.Title />
      </BookGroupNavigation>
      <BookGroupJoinForm groupId={groupId} />
    </SSRSafeSuspense>
  );
};

const BookGroupJoinForm = ({ groupId }: { groupId: number }) => {
  const toast = useToast();
  const { data: bookGroupJoinData } = useBookGroupJoinInfo(groupId);
  const { isMember, hasPassword, question } = bookGroupJoinData;

  if (isMember || !hasPassword) {
    notFound();
  }

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormValues>({ mode: 'all' });

  const submitJoinForm: SubmitHandler<JoinFormValues> = async ({ answer }) => {
    try {
      await groupAPI.joinGroup({ bookGroupId: groupId, password: answer });
      toast.show({ message: '🎉 모임에 가입되었어요! 🎉', type: 'success' });
    } catch (error) {
      if (
        isAxiosErrorWithCustomCode(error) &&
        error.response.data.code === 'BG3'
      ) {
        toast.show({ message: '올바른 답이 아니에요', type: 'error' });
      }
    }
  };

  return (
    <form
      className="mt-[2.5rem] flex flex-col gap-[2.5rem]"
      onSubmit={handleSubmit(submitJoinForm)}
    >
      <p className="whitespace-pre-line text-2xl font-bold leading-snug">
        {`문제를 맞추면
          모임에 가입할 수 있어요`}
      </p>
      <div className="flex flex-col gap-[1.5rem]">
        <p className="text-sm">{question}</p>
        <div className="flex flex-col gap-[0.5rem]">
          <Input
            {...register('answer', {
              required: '정답을 입력해주세요',
              minLength: { value: 1, message: '2자 이상 입력해주세요.' },
              maxLength: { value: 20, message: '20자 이하 입력해주세요.' },
            })}
            placeholder="띄어쓰기 없이 정답을 입력해주세요"
            error={!!errors.answer}
          />
          <div className="flex flex-row-reverse justify-between gap-[0.4rem]">
            <InputLength
              isError={!!errors.answer}
              currentLength={watch('answer')?.length}
              maxLength={20}
            />
            {errors.answer && (
              <ErrorMessage>{errors.answer.message}</ErrorMessage>
            )}
          </div>
        </div>
      </div>
      <BottomActionButton type="submit">제출하기</BottomActionButton>
    </form>
  );
};

export default BookGroupJoinPage;
