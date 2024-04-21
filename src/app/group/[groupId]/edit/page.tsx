'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import type { APIGroupDetail, BookGroupEdit } from '@/types/group';
import {
  useBookGroupEditCurrentInfo,
  useBookGroupInfoMutation,
} from '@/queries/group/useBookGroupQuery';

import BookGroupEditTopNavigation from '@/v1/bookGroup/edit/BookGroupEditTopNavigation';
import BookGroupEditTitleForm from '@/v1/bookGroup/edit/BookGroupEditTitleForm';
import BookGroupEditIntroduceForm from '@/v1/bookGroup/edit/BookGroupEditIntroduceForm';
import BookGroupEditDateForm from '@/v1/bookGroup/edit/BookGroupEditDateForm';
import { isAxiosErrorWithCustomCode } from '@/utils/helpers';
import { SERVICE_ERROR_MESSAGE } from '@/constants';
import useToast from '@/v1/base/Toast/useToast';

const BookGroupEditPage = ({
  params: { groupId },
}: {
  params: { groupId: APIGroupDetail['bookGroupId'] };
}) => {
  const { show: showToast } = useToast();

  const router = useRouter();

  const { data: bookGroupData } = useBookGroupEditCurrentInfo(groupId);
  const { title, description, maxMemberCount, startDate, endDate } =
    bookGroupData;

  const bookGroupEdit = useBookGroupInfoMutation(groupId);

  const methods = useForm<BookGroupEdit>({
    mode: 'all',
    defaultValues: {
      title: title,
      introduce: description,
      maxMemberCount: maxMemberCount ? maxMemberCount : 9999,
      startDate: startDate,
      endDate: endDate,
    },
  });

  const handleFormSubmit: SubmitHandler<BookGroupEdit> = async ({
    title,
    introduce,
    maxMemberCount,
    endDate,
  }) => {
    bookGroupEdit.mutate(
      { title, introduce, maxMemberCount, endDate },
      {
        onSuccess: () => {
          router.push(`/group/${groupId}`);

          showToast({ type: 'success', message: '모임 정보 수정 완료 🎉' });
          return;
        },
        onError: error => {
          if (isAxiosErrorWithCustomCode(error)) {
            const { code } = error.response.data;
            const message = SERVICE_ERROR_MESSAGE[code];

            showToast({ type: 'error', message });
            return;
          }

          showToast({
            type: 'error',
            message: '모임 정보 수정을 실패했어요 🥲',
          });
        },
      }
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <BookGroupEditTopNavigation onSubmit={handleFormSubmit} />

        <form
          className="mt-[2.5rem] flex flex-col gap-[3.2rem]"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <BookGroupEditTitleForm />
          <BookGroupEditIntroduceForm />
          <BookGroupEditDateForm />
        </form>
      </FormProvider>
    </>
  );
};

export default BookGroupEditPage;
