'use client';

import useMyGroupsQuery from '@/queries/group/useMyGroupQuery';
import { checkAuthentication } from '@/utils/helpers';

import SSRSafeSuspense from '@/v1/base/SSRSafeSuspense';
import withAuthRequired from '@/hocs/withAuthRequired';

import BackButton from '@/v1/base/BackButton';
import TopNavigation from '@/v1/base/TopNavigation';
import DetailBookGroupCard from '@/v1/bookGroup/DetailBookGroupCard';

const UserGroupPage = () => {
  return (
    <>
      <TopNavigation>
        <TopNavigation.LeftItem>
          <BackButton />
        </TopNavigation.LeftItem>
        <TopNavigation.CenterItem>내가 참여한 모임</TopNavigation.CenterItem>
      </TopNavigation>
      <SSRSafeSuspense fallback={<PageSkeleton />}>
        <UserGroupContent />
      </SSRSafeSuspense>
    </>
  );
};

export default withAuthRequired(UserGroupPage);

const UserGroupContent = () => {
  const isAuthenticated = checkAuthentication();
  const { data } = useMyGroupsQuery({ enabled: isAuthenticated });

  return (
    <ul className="flex flex-col gap-[1rem] pt-[2rem]">
      {data.bookGroups.map(
        ({
          title,
          introduce,
          book,
          startDate,
          endDate,
          owner,
          memberCount,
          commentCount,
          isPublic,
          bookGroupId,
        }) => (
          <li key={bookGroupId}>
            <DetailBookGroupCard
              title={title}
              description={introduce}
              bookImageSrc={book.imageUrl}
              date={{ start: startDate, end: endDate }}
              owner={{
                name: owner.nickname,
                profileImageSrc: owner.profileUrl,
              }}
              memberCount={memberCount}
              commentCount={commentCount}
              isPublic={isPublic}
              bookGroupId={bookGroupId}
            />
          </li>
        )
      )}
    </ul>
  );
};

const PageSkeleton = () => (
  <ul className="flex animate-pulse flex-col gap-[1rem] pt-[2rem]">
    {Array.from({ length: 4 }).map((_, index) => (
      <li
        key={index}
        className="border-placeholder px-[1.6rem] py-[0.9rem] shadow-bookgroup-card"
      >
        <div className="flex gap-[0.5rem] [&>*]:rounded-[0.5rem]">
          <div className="h-[1.9rem] w-[4.34rem] bg-placeholder" />
          <div className="h-[1.9rem] w-[4.34rem] bg-placeholder" />
        </div>

        <div className="flex justify-between gap-[1.5rem] pt-[1rem]">
          <div className="flex flex-col justify-between [&>*]:rounded-[0.5rem]">
            <div className="h-[2.15rem] w-[23rem] bg-placeholder" />
            <div className="h-[2rem] w-[10rem] bg-placeholder" />
          </div>
          <div className="h-[10.5rem] w-[7.5rem] rounded-[0.5rem] bg-placeholder" />
        </div>
      </li>
    ))}
  </ul>
);
