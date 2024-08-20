'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import useEntireGroupsQuery from '@/queries/group/useEntireGroupsQuery';
import useMyGroupsQuery from '@/queries/group/useMyGroupQuery';
import { useMyProfileId } from '@/queries/user/useMyProfileQuery';

import useMounted from '@/hooks/useMounted';
import { checkAuthentication } from '@/utils/helpers';
import useToast from '@/v1/base/Toast/useToast';

import FloatingButton from '@/v1/base/FloatingButton';
import Loading from '@/v1/base/Loading';
import TopHeader from '@/v1/base/TopHeader';
import DetailBookGroupCard, {
  DetailBookGroupCardSkeleton,
} from '@/v1/bookGroup/DetailBookGroupCard';
import SearchGroupInput from '@/v1/bookGroup/SearchGroup';
import SimpleBookGroupCard, {
  SimpleBookGroupCardSkeleton,
} from '@/v1/bookGroup/SimpleBookGroupCard';

const GroupPage = () => {
  const router = useRouter();
  const { show: showToast } = useToast();

  const isAuthenticated = checkAuthentication();

  const handleSearchInputClick = () => {
    showToast({ message: '아직 준비 중인 기능이에요 🥹', type: 'normal' });
  };

  const handleCreateGroupClick = () => {
    if (isAuthenticated) {
      router.push('/group/create');
    } else {
      showToast({ message: '로그인 후에 이용할 수 있어요!', type: 'normal' });
    }

    return;
  };

  const FLOATING_BUTTON_POSITION =
    'bottom-[8.3rem] right-[1.7rem] desktop:right-1/2 desktop:translate-x-[19.8rem]';

  return (
    <>
      <TopHeader text="Group" />
      <div className="flex w-full flex-col gap-[2rem]">
        <SearchGroupInput onClick={handleSearchInputClick} />
        <SSRSafeSuspense fallback={<PageSkeleton />}>
          {isAuthenticated && <MyBookGroupList />}
          <EntireBookGroupList />
        </SSRSafeSuspense>
      </div>
      <FloatingButton
        onClick={handleCreateGroupClick}
        position={FLOATING_BUTTON_POSITION}
      />
    </>
  );
};

export default GroupPage;

const MyBookGroupList = () => {
  const isAuthenticated = checkAuthentication();
  const {
    data: { bookGroups },
  } = useMyGroupsQuery({ enabled: isAuthenticated });
  const { data: myId } = useMyProfileId({ enabled: isAuthenticated });

  return (
    <section className="flex gap-[1rem] overflow-y-hidden overflow-x-scroll pb-[1.5rem]">
      {bookGroups.map(({ title, book, bookGroupId, owner }) => (
        <SimpleBookGroupCard
          key={bookGroupId}
          title={title}
          imageSource={book.imageUrl}
          isOwner={owner.id === myId}
          bookGroupId={bookGroupId}
        />
      ))}
    </section>
  );
};

const PageSkeleton = () => {
  const isMounted = useMounted();

  if (!isMounted) {
    return <Loading fullpage />;
  }

  return (
    <>
      <MyBookGroupListSkeleton />
      <div className="flex flex-col gap-[1rem]">
        <DetailBookGroupCardSkeleton />
        <DetailBookGroupCardSkeleton />
        <DetailBookGroupCardSkeleton />
        <DetailBookGroupCardSkeleton />
      </div>
    </>
  );
};

const MyBookGroupListSkeleton = () => (
  <div className="flex min-h-[16.3rem] animate-pulse gap-[1rem] overflow-hidden">
    <SimpleBookGroupCardSkeleton />
    <SimpleBookGroupCardSkeleton />
    <SimpleBookGroupCardSkeleton />
    <SimpleBookGroupCardSkeleton />
  </div>
);

const EntireBookGroupList = () => {
  const { ref, inView } = useInView();

  const {
    isSuccess,
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEntireGroupsQuery();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (isLoading)
    return (
      <div className="flex flex-col gap-[1rem]">
        <DetailBookGroupCardSkeleton />
        <DetailBookGroupCardSkeleton />
        <DetailBookGroupCardSkeleton />
        <DetailBookGroupCardSkeleton />
      </div>
    );

  return (
    <>
      <section className="flex flex-col gap-[1rem]">
        {isSuccess &&
          data.pages.map(({ bookGroups }) =>
            bookGroups.map(
              ({
                bookGroupId,
                title,
                introduce,
                book,
                startDate,
                endDate,
                owner,
                memberCount,
                commentCount,
                isPublic,
              }) => (
                <DetailBookGroupCard
                  key={bookGroupId}
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
              )
            )
          )}
      </section>
      {isFetchingNextPage && <DetailBookGroupCardSkeleton />}
      <div ref={ref} />
    </>
  );
};
