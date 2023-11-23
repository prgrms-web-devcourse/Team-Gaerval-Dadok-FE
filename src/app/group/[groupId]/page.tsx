'use client';

import TopNavigation from '@/ui/Base/TopNavigation';
import BookGroupInfo from '@/v1/bookGroup/detail/BookGroupInfo';
import { IconArrowLeft, IconHamburger, IconPost } from '@public/icons';

import { useBookGroupTitle } from '@/queries/group/useBookGroupQuery';
import CommentList from '@/v1/bookGroup/detail/CommentList';
import { useRouter } from 'next/navigation';

const DetailBookGroupPage = ({
  params: { groupId },
}: {
  params: { groupId: number };
}) => {
  return (
    <>
      <BookGroupNavigation groupId={groupId} />
      <div className="flex flex-col gap-[2rem]">
        <BookGroupInfo groupId={groupId} />
        <div className="flex flex-col gap-[1rem]">
          <Heading text="게시글" />
          <CommentList groupId={groupId} />
        </div>
      </div>
    </>
  );
};

export default DetailBookGroupPage;

const BookGroupNavigation = ({ groupId }: { groupId: number }) => {
  const router = useRouter();
  const { data: title } = useBookGroupTitle(groupId);

  return (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <a onClick={router.back}>
          <IconArrowLeft />
        </a>
      </TopNavigation.LeftItem>
      <TopNavigation.CenterItem textAlign="left">
        <p className="w-[90%] truncate">{title}</p>
      </TopNavigation.CenterItem>
      <TopNavigation.RightItem>
        <IconPost />
        <IconHamburger />
      </TopNavigation.RightItem>
    </TopNavigation>
  );
};

const Heading = ({ text }: { text: string }) => (
  <p className=" text-xl font-bold">{text}</p>
);
