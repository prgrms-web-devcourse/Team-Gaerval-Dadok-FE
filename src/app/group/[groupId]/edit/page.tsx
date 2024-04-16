'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import type { APIGroupDetail } from '@/types/group';
import { useBookGroupEditCurrentInfo } from '@/queries/group/useBookGroupQuery';

import BookGroupEditDateForm from '@/v1/bookGroup/edit/BookGroupEditDateForm';
import BookGroupEditTopNavigation from '@/v1/bookGroup/edit/BookGroupEditTopNavigation';
import BookGroupIntroduceForm from '@/v1/bookGroup/edit/BookGroupIntroduceForm';
import BookGroupEditTitleForm from '@/v1/bookGroup/edit/BookGroupEditTitleForm';

export type GroupEditFormValues = {
  groupTitle: string;
  groupIntroduce: string;
  startDate: string;
  endDate: string;
};

const BookGroupEditPage = ({
  params: { groupId },
}: {
  params: { groupId: APIGroupDetail['bookGroupId'] };
}) => {
  const { data: bookGroupData } = useBookGroupEditCurrentInfo(groupId);
  const { title, description, startDate, endDate } = bookGroupData;

  const methods = useForm<GroupEditFormValues>({
    mode: 'all',
    defaultValues: {
      groupTitle: title,
      groupIntroduce: description,
      startDate: startDate,
      endDate: endDate,
    },
  });

  const handleFormSubmit: SubmitHandler<GroupEditFormValues> = ({
    groupTitle,
    groupIntroduce,
    endDate,
  }) => {
    alert(
      `groupTitle: ${groupTitle}, groupIntroduce: ${groupIntroduce}, startDate: ${startDate}, endDate: ${endDate}`
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
          <BookGroupIntroduceForm />
          <BookGroupEditDateForm />
        </form>
      </FormProvider>
    </>
  );
};

export default BookGroupEditPage;
