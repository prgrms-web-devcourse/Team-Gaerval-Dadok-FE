'use client';

import { notFound } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';

import { checkAuthentication } from '@/utils/helpers';

import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import LoginBottomActionButton from '@/components/common/LoginBottomActionButton';
import BookGroupNavigation from '@/components/bookGroup/BookGroupNavigation';
import BookGroupInfo from '@/components/bookGroup/detail/BookGroupInfo';
import JoinBookGroupButton from '@/components/bookGroup/detail/JoinBookGroupButton';
import BookGroupCommentList from '@/components/comment/BookGroupCommentList';

const DetailBookGroupPage = ({
  params: { groupId },
}: {
  params: { groupId: number };
}) => {
  const isAuthenticated = checkAuthentication();

  return (
    <ErrorBoundary fallbackRender={notFound}>
      <BookGroupNavigation groupId={groupId}>
        <BookGroupNavigation.BackButton />
        <BookGroupNavigation.Title />
        <BookGroupNavigation.WriteButton />
        <BookGroupNavigation.MenuButton />
      </BookGroupNavigation>

      <SSRSafeSuspense fallback={<PageSkeleton />}>
        <div className="pb-action-button flex flex-col gap-[2rem]">
          <BookGroupInfo groupId={groupId} />
          <Divider />
          <div className="flex flex-col gap-[1rem]">
            <Heading text="게시글" />
            <BookGroupCommentList groupId={groupId} />
          </div>
        </div>
        {isAuthenticated ? (
          <JoinBookGroupButton groupId={groupId} />
        ) : (
          <LoginBottomActionButton />
        )}
      </SSRSafeSuspense>
    </ErrorBoundary>
  );
};

export default DetailBookGroupPage;

const Heading = ({ text }: { text: string }) => (
  <p className="font-subheading-bold">{text}</p>
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

const Divider = () => <p className="w-app h-[0.5rem] bg-background"></p>;
