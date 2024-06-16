'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';

import type { APIEditBookGroup } from '@/types/group';

import TopNavigation from '@/components/common/TopNavigation';
import BackButton from '@/components/common/BackButton';

const BookGroupEditTopNavigation = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<APIEditBookGroup>;
}) => {
  const { handleSubmit } = useFormContext<APIEditBookGroup>();

  return (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <BackButton />
      </TopNavigation.LeftItem>
      <TopNavigation.CenterItem>
        <h1 className="text-black-900 font-body1-regular">모임 수정하기</h1>
      </TopNavigation.CenterItem>
      <TopNavigation.RightItem>
        <button
          onClick={handleSubmit(onSubmit)}
          className="cursor-pointer text-main-900 font-body1-bold"
        >
          완료
        </button>
      </TopNavigation.RightItem>
    </TopNavigation>
  );
};

export default BookGroupEditTopNavigation;
