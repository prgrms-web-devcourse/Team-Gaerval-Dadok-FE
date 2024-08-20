'use client';

import TopHeader from '@/v1/base/TopHeader';
import SearchGroup from '@/v1/bookGroup/SearchGroup';
import SimpleBookGroupCard from '@/v1/bookGroup/SimpleBookGroupCard';
import DetailBookGroupCard from '@/v1/bookGroup/DetailBookGroupCard';

import useEntireGroupsQuery from '@/queries/group/useEntireGroupsQuery';
import useMyGroupsQuery from '@/queries/group/useMyGroupsQuery';
import { Skeleton, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const GroupPage = () => {
  const { ref, inView } = useInView();

  const {
    isSuccess: entireGroupsIsSuccess,
    data: entireGroupsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEntireGroupsQuery();

  const { isSuccess: myGroupsIsSuccess, data: myGroupsData } =
    useMyGroupsQuery();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (isLoading)
    return (
      <VStack gap="0.5rem" align="stretch" w="100%">
        <Skeleton height="9rem" />
        <Skeleton height="28rem" />
        <Skeleton height="28rem" />
        <Skeleton height="28rem" />
      </VStack>
    );

  return (
    <>
      <TopHeader pathname={'/group'} />
      <div className="mt-[2rem] flex w-full flex-col gap-[1.5rem]">
        <SearchGroup
          onClick={() => {
            alert('추후 업데이트 될 예정입니다.');
          }}
        />
        <div className="mt-[0.7rem] flex gap-[1rem] overflow-scroll">
          {myGroupsIsSuccess &&
            myGroupsData.bookGroups.map(group => {
              const { title, book, bookGroupId } = group;
              return (
                //API isOwner 값이 존재하지 않아 비교하는 로직 추가 필요
                <SimpleBookGroupCard
                  key={bookGroupId}
                  title={title}
                  imageSource={book.imageUrl}
                  isOwner={false}
                  bookGroupId={bookGroupId}
                />
              );
            })}
        </div>
        <div className="flex flex-col gap-[1rem]">
          {entireGroupsIsSuccess &&
            entireGroupsData.pages.map(groups => {
              return groups.bookGroups.map(group => {
                const {
                  title,
                  introduce,
                  book,
                  startDate,
                  endDate,
                  owner,
                  currentMemberCount,
                  commentCount,
                  isPublic,
                  bookGroupId,
                } = group;
                return (
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
                    memberCount={currentMemberCount}
                    commentCount={commentCount}
                    isPublic={isPublic}
                    bookGroupId={bookGroupId}
                  />
                );
              });
            })}
        </div>
      </div>
      <div ref={ref} />
      {isFetchingNextPage && <Skeleton w="100%" height="28rem" />}
      {/* <Link href={'/group/create'}>
        <FloatingButton position="bottom-right" />
      </Link> */}
    </>
  );
};

export default GroupPage;
