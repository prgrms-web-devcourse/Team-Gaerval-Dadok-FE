'use client';

import { useToast } from '@/hooks/toast';
import useBookshelfBooksQuery from '@/queries/bookshelf/useBookshelfBookListQuery';
import useBookshelfInfoQuery from '@/queries/bookshelf/useBookshelfInfoQuery';
import {
  useBookshelfLike,
  useBookshelfUnlike,
} from '@/queries/bookshelf/useBookshelfLikeMutation';
import { APIBookshelf } from '@/types/bookshelf';
import Button from '@/ui/common/Button';
import IconButton from '@/ui/common/IconButton';
import { LikeButton } from '@/ui/common/BookshelfLike/';
import TopNavigation from '@/ui/common/TopNavigation';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import InitialBookShelfData from '@/ui/InteractiveBookShelf/InitialBookShelfData';
import UserJobInfoTag from '@/ui/UserJobInfoTag';
import { isAuthed } from '@/utils/helpers';
import {
  Box,
  Flex,
  Highlight,
  HStack,
  Image,
  Link,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const kakaoUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;

export default function UserBookShelfPage({
  params: { bookshelfId },
}: {
  params: {
    bookshelfId: APIBookshelf['bookshelfId'];
  };
}) {
  const { ref, inView } = useInView();
  const { data: infoData, isSuccess: infoIsSuccess } = useBookshelfInfoQuery({
    bookshelfId,
  });
  const { mutate: likeBookshelf } = useBookshelfLike(bookshelfId);
  const { mutate: unlikeBookshelf } = useBookshelfUnlike(bookshelfId);
  const pathname = usePathname();
  const { showToast } = useToast();
  const {
    data: booksData,
    fetchNextPage,
    hasNextPage,
    isSuccess: booksIsSuccess,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useBookshelfBooksQuery({ bookshelfId });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (isLoading) {
    return (
      <VStack gap="2rem" mt="7.8rem">
        <Skeleton width="100%" height="15.2rem" />
        <Skeleton width="100%" height="15.2rem" />
        <Skeleton width="100%" height="15.2rem" />
        <Skeleton width="100%" height="15.2rem" />
      </VStack>
    );
  }

  if (!(infoIsSuccess && booksIsSuccess)) return null;

  const filtered = () => {
    const data = booksData.pages[0].books;

    if (isAuthed()) return data;

    return data.slice(0, 4);
  };

  const filteredData = filtered();

  const handleClickShareButton = () => {
    const url = 'https://dev.dadok.site' + pathname;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        showToast({ message: '복사 성공!' });
      })
      .catch(() => {
        showToast({ message: '잠시 후 다시 시도해주세요' });
      });
  };

  const handleBookshelfLikeButton = () => {
    !infoData.isLiked ? likeBookshelf() : unlikeBookshelf();
  };

  return (
    <VStack width="100%" height="100%">
      <Flex width="100%" align="center">
        <TopNavigation pageTitle={infoData.bookshelfName} />
        <IconButton
          name="share"
          size="2.2rem"
          onClick={handleClickShareButton}
          cursor="pointer"
          marginBottom="1rem"
        />
      </Flex>
      <Flex width="100%" height="3rem" align="center" justify="space-between">
        <HStack gap="0.08rem" py="1.6rem">
          <UserJobInfoTag tag={infoData.job.jobGroupKoreanName} />
          {infoData.job.jobNameKoreanName && (
            <UserJobInfoTag tag={infoData.job.jobNameKoreanName} />
          )}
        </HStack>
        <LikeButton
          handleBookshelfLikeButton={handleBookshelfLikeButton}
          isLiked={infoData.isLiked}
          likeCount={infoData.likeCount}
        />
      </Flex>
      <VStack width="100%" spacing="2rem">
        {isAuthed() ? (
          booksData.pages.map((page, idx) => (
            <InteractiveBookShelf key={idx} books={page.books} />
          ))
        ) : (
          <>
            <InteractiveBookShelf books={filteredData} />
            <InitialBookShelfData />
            <Text textAlign="center" fontSize="lg" pt="5rem">
              로그인 후에
              <br />
              <Highlight
                query={infoData.bookshelfName}
                styles={{ color: 'main', fontWeight: 'bold' }}
              >
                {`${infoData.bookshelfName}을 확인해 주세요!`}
              </Highlight>
            </Text>
            <Link href={kakaoUrl} style={{ width: '100%' }}>
              <Button scheme="kakao" fullWidth>
                <Image
                  src="/icons/kakao-legacy.svg"
                  alt="카카오 로고"
                  width={21}
                  height={19}
                />
                카카오 로그인
              </Button>
            </Link>
          </>
        )}
        {isFetching && !isFetchingNextPage ? null : <Box ref={ref} />}
      </VStack>
    </VStack>
  );
}
