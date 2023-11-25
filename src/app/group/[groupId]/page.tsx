'use client';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import BookGroupInfo from '@/v1/bookGroup/detail/BookGroupInfo';
import CommentList from '@/v1/bookGroup/detail/CommentList';
import BookGroupNavigation from '@/v1/bookGroup/BookGroupNavigation';
import JoinBookGroupButton from '@/v1/bookGroup/detail/JoinBookGroupButton';

const DetailBookGroupPage = ({
  params: { groupId },
}: {
  params: { groupId: number };
}) => {
  return (
    <>
      <BookGroupNavigation groupId={groupId}>
        <BookGroupNavigation.BackButton />
        <BookGroupNavigation.Title />
        <BookGroupNavigation.WriteButton />
        <BookGroupNavigation.MenuButton />
      </BookGroupNavigation>

      <SSRSafeSuspense fallback={<PageSkeleton />}>
        <div className="flex flex-col gap-[2rem]">
          <BookGroupInfo groupId={groupId} />
          <Heading text="게시글" />
          <CommentList groupId={groupId} />
        </div>
        <JoinBookGroupButton groupId={groupId} />
      </SSRSafeSuspense>
    </>
  );
};

export default DetailBookGroupPage;

const Heading = ({ text }: { text: string }) => (
  <p className=" text-xl font-bold">{text}</p>
);

const PageSkeleton = () => (
  <div className="flex w-full animate-pulse flex-col gap-[1rem] py-[2rem]">
    <div className="h-[1.3rem] w-[6rem] bg-black-400"></div>
    <div className="flex items-center gap-[1rem]">
      <div className="h-[3.2rem] w-[3.2rem] rounded-full bg-black-400"></div>
      <div className="h-[1.3rem] w-[8rem] bg-black-400"></div>
    </div>
    <div className="h-[1.8rem] w-[60%] bg-black-400"></div>
    <div className="h-[18rem] w-full bg-black-400"></div>
  </div>
);
