'use client';

import { useRouter } from 'next/navigation';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import Loading from '@/ui/Base/Loading';
import TopNavigation from '@/ui/Base/TopNavigation';
import BookGroupInfo from '@/v1/bookGroup/detail/BookGroupInfo';
import CommentList from '@/v1/bookGroup/detail/CommentList';
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
      <SSRSafeSuspense fallback={<Loading fullpage />}>
        <div className="flex flex-col gap-[2rem]">
          <BookGroupInfo groupId={groupId} />
          <div className="flex flex-col gap-[1rem]">
            <Heading text="게시글" />
            <CommentList groupId={groupId} />
          </div>
        </div>
      </SSRSafeSuspense>
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
