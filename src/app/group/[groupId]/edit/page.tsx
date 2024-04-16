'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import type { APIGroupDetail } from '@/types/group';
import { useBookGroupEditCurrentInfo } from '@/queries/group/useBookGroupQuery';
import groupAPI from '@/apis/group';

import BookGroupEditDateForm from '@/v1/bookGroup/edit/BookGroupEditDateForm';
import BookGroupEditTopNavigation from '@/v1/bookGroup/edit/BookGroupEditTopNavigation';
import BookGroupIntroduceForm from '@/v1/bookGroup/edit/BookGroupIntroduceForm';
import BookGroupEditTitleForm from '@/v1/bookGroup/edit/BookGroupEditTitleForm';

export type GroupEditFormValues = {
  groupTitle: string;
  groupIntroduce: string;
  maxMemberCount: number;
  startDate: string;
  endDate: string;
};

const BookGroupEditPage = ({
  params: { groupId },
}: {
  params: { groupId: APIGroupDetail['bookGroupId'] };
}) => {
  const router = useRouter();

  const { data: bookGroupData } = useBookGroupEditCurrentInfo(groupId);
  const { title, description, maxMemberCount, startDate, endDate } =
    bookGroupData;

  const methods = useForm<GroupEditFormValues>({
    mode: 'all',
    defaultValues: {
      groupTitle: title,
      groupIntroduce: description,
      maxMemberCount: maxMemberCount ? maxMemberCount : 9999,
      startDate: startDate,
      endDate: endDate,
    },
  });

  const handleFormSubmit: SubmitHandler<GroupEditFormValues> = async ({
    groupTitle,
    groupIntroduce,
    maxMemberCount,
    endDate,
  }) => {
    try {
      await groupAPI.updateGroupInfo({
        bookGroupId: groupId,
        group: {
          title: groupTitle,
          introduce: groupIntroduce,
          maxMemberCount: maxMemberCount,
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
          <BookGroupIntroduceForm />
          <BookGroupEditDateForm />
        </form>
      </FormProvider>
    </>
  );
};

export default BookGroupEditPage;
