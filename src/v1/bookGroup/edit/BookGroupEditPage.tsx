'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { getTodayDate } from '@/utils/date';

import BookGroupEditDateForm from './BookGroupEditDateForm';
import BookGroupEditTopNavigation from './BookGroupEditTopNavigation';
import BookGroupIntroduceForm from './BookGroupIntroduceForm';
import BookGroupTitleForm from './BookGroupTitleForm';

export type GroupEditFormValues = {
  groupTitle: string;
  groupIntroduce: string;
  startDate: string;
  endDate: string;
};

const BookGroupEditPage = () => {
  const methods = useForm<GroupEditFormValues>({
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
      <FormProvider {...methods}>
        <BookGroupEditTopNavigation onSubmit={handleFormSubmit} />

        <form
          className="mt-[2.5rem] flex flex-col gap-[3.2rem]"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <BookGroupTitleForm />
          <BookGroupIntroduceForm />
          <BookGroupEditDateForm />
        </form>
      </FormProvider>
    </>
  );
};

export default BookGroupEditPage;
