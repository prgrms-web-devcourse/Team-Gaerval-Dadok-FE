'use client';

import { notFound, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import useJoinBookGroup from '@/hooks/group/useJoinBookGroup';

import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import withAuthRequired from '@/hocs/withAuthRequired';

import Loading from '@/components/common/Loading';
import Input from '@/components/common/Input';
import InputLength from '@/components/common/InputLength';
import ErrorMessage from '@/components/common/ErrorMessage';
import StickyFooter from '@/components/common/StickyFooter';
import BookGroupNavigation from '@/components/bookGroup/BookGroupNavigation';
import Button from '@/components/common/Button';

type JoinFormValues = {
  answer: string;
};

const JoinBookGroupPage = ({
  params: { groupId },
}: {
  params: { groupId: number };
}) => {
  return (
    <SSRSafeSuspense fallback={<Loading fullpage />}>
      <BookGroupNavigation groupId={groupId}>
        <BookGroupNavigation.BackButton
          href={`/group/${groupId}`}
          routeOption="replace"
        />
        <BookGroupNavigation.Title />
      </BookGroupNavigation>
      <BookGroupJoinForm groupId={groupId} />
    </SSRSafeSuspense>
  );
};

export default withAuthRequired(JoinBookGroupPage);

const BookGroupJoinForm = ({ groupId }: { groupId: number }) => {
  const router = useRouter();
  const { isMember, hasPassword, question, joinBookGroup } =
    useJoinBookGroup(groupId);

  if (isMember || !hasPassword) {
    notFound();
  }

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormValues>({ mode: 'all' });

  const submitJoinForm: SubmitHandler<JoinFormValues> = ({ answer }) => {
    joinBookGroup({
      answer,
      onSuccess: () => router.replace(`/group/${groupId}`),
    });
  };

  return (
    <form
      className="mt-[2.5rem] flex flex-col gap-[2.5rem]"
      onSubmit={handleSubmit(submitJoinForm)}
    >
      <p className="whitespace-pre-line !leading-snug font-subheading-bold">
        {`문제를 맞추면
          모임에 가입할 수 있어요`}
      </p>
      <div className="flex flex-col gap-[1.5rem]">
        <p className="font-body2-regular">{question}</p>
        <div className="flex flex-col gap-[0.5rem]">
          <Input
            {...register('answer', {
              required: '정답을 입력해주세요',
              pattern: {
                value: /^\S*$/g,
                message: '띄어쓰기 없이 정답을 입력해주세요.',
              },
              minLength: { value: 1, message: '1자 이상 입력해주세요.' },
              maxLength: { value: 10, message: '10자 이하 입력해주세요.' },
            })}
            placeholder="띄어쓰기 없이 정답을 입력해주세요"
            error={!!errors.answer}
          />
          <div className="flex flex-row-reverse justify-between gap-[0.4rem]">
            <InputLength
              isError={!!errors.answer}
              currentLength={watch('answer')?.length}
              maxLength={10}
            />
            {errors.answer && (
              <ErrorMessage>{errors.answer.message}</ErrorMessage>
            )}
          </div>
        </div>
      </div>

      <StickyFooter>
        <Button type="submit" size="full">
          제출하기
        </Button>
      </StickyFooter>
    </form>
  );
};
