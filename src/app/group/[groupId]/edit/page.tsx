'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import type { APIGroupDetail, BookGroupEdit } from '@/types/group';
import { useBookGroupEditCurrentInfo } from '@/queries/group/useBookGroupQuery';
import groupAPI from '@/apis/group';

import BookGroupEditTopNavigation from '@/v1/bookGroup/edit/BookGroupEditTopNavigation';
import BookGroupEditTitleForm from '@/v1/bookGroup/edit/BookGroupEditTitleForm';
import BookGroupEditIntroduceForm from '@/v1/bookGroup/edit/BookGroupEditIntroduceForm';
import BookGroupEditDateForm from '@/v1/bookGroup/edit/BookGroupEditDateForm';

const BookGroupEditPage = ({
  params: { groupId },
}: {
  params: { groupId: APIGroupDetail['bookGroupId'] };
}) => {
  const router = useRouter();

  const { data: bookGroupData } = useBookGroupEditCurrentInfo(groupId);
  const { title, description, maxMemberCount, startDate, endDate } =
    bookGroupData;

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
    try {
      await groupAPI.updateGroupInfo({
        bookGroupId: groupId,
        group: {
          title,
          introduce,
          maxMemberCount,
          endDate,
        },
      });

      router.push(`/group/${groupId}`);
    } catch (error) {
      console.error(error);
    }
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
