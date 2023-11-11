'use client';

import TopNavigation from '@/ui/Base/TopNavigation';
import BookGroupInfo from '@/v1/bookGroup/detail/BookGroupInfo';
import { IconArrowLeft, IconHamburger, IconPost } from '@public/icons';

import { useBookGroupTitle } from '@/queries/group/useBookGroupQuery';

const DetailBookGroupPage = ({
  params: { groupId },
}: {
  params: { groupId: number };
}) => {
  return (
    <>
      <BookGroupNavigation groupId={groupId} />
      <BookGroupInfo groupId={groupId} />
    </>
  );
};

export default DetailBookGroupPage;

const BookGroupNavigation = ({ groupId }: { groupId: number }) => {
  const { data: title } = useBookGroupTitle(groupId);

  return (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <IconArrowLeft />
      </TopNavigation.LeftItem>
      <TopNavigation.CenterItem textAlign="left">
        {title}
      </TopNavigation.CenterItem>
      <TopNavigation.RightItem>
        <IconPost />
        <IconHamburger />
      </TopNavigation.RightItem>
    </TopNavigation>
  );
};
