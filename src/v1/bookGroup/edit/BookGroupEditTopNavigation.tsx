'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';

import type { BookGroupEdit } from '@/types/group';

import TopNavigation from '@/v1/base/TopNavigation';
import BackButton from '@/v1/base/BackButton';

const BookGroupEditTopNavigation = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<BookGroupEdit>;
}) => {
  const { handleSubmit } = useFormContext<BookGroupEdit>();

  return (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <BackButton />
      </TopNavigation.LeftItem>
      <TopNavigation.CenterItem>
        <h1 className="text-md text-black-900">모임 수정하기</h1>
      </TopNavigation.CenterItem>
      <TopNavigation.RightItem>
        <button
          onClick={handleSubmit(onSubmit)}
          className="cursor-pointer font-bold text-main-900"
        >
          완료
        </button>
      </TopNavigation.RightItem>
    </TopNavigation>
  );
};

export default BookGroupEditTopNavigation;
