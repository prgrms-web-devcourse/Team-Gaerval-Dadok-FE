'use client';

import { ReactNode, Suspense } from 'react';
import { useRouter } from 'next/navigation';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
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
      <BookGroupNavigation>
        <Suspense fallback={<TitleSkeleton />}>
          <PageTitle groupId={groupId} />
        </Suspense>
      </BookGroupNavigation>
      <SSRSafeSuspense fallback={<PageSkeleton />}>
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

const BookGroupNavigation = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <a onClick={router.back}>
          <IconArrowLeft />
        </a>
      </TopNavigation.LeftItem>
      <TopNavigation.CenterItem textAlign="left">
        {children}
      </TopNavigation.CenterItem>
      <TopNavigation.RightItem>
        <IconPost />
        <IconHamburger />
      </TopNavigation.RightItem>
    </TopNavigation>
  );
};

const PageTitle = ({ groupId }: { groupId: number }) => {
  const { data: title } = useBookGroupTitle(groupId);
  return <p className="w-[90%] truncate">{title}</p>;
};

const Heading = ({ text }: { text: string }) => (
  <p className=" text-xl font-bold">{text}</p>
);

const TitleSkeleton = () => (
  <div className="h-[1.3rem] w-[8rem] bg-black-400"></div>
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
