import { useAuth } from '@/hooks/auth';
import useBookshelfBooksQuery from '@/queries/bookshelf/useBookshelfBookListQuery';
import useBookshelfInfoQuery from '@/queries/bookshelf/useBookshelfInfoQuery';
import { APIBookshelf } from '@/types/bookshelf';
import Button from '@/ui/common/Button';
import IconButton from '@/ui/common/IconButton';
import TopNavigation from '@/ui/common/TopNavigation';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import InitialBookShelfData from '@/ui/InteractiveBookShelf/InitialBookShelfData';
import UserJobInfoTag from '@/ui/UserJobInfoTag';
import {
  Box,
  Highlight,
  HStack,
  Image,
  Link,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const kakaoUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;

export default function UserBookShelfPage({
  bookshelfId,
}: {
  bookshelfId: APIBookshelf['bookshelfId'];
}) {
  const { isAuthed } = useAuth();
  const { ref, inView } = useInView();
  const { data: infoData, isSuccess: infoIsSuccess } = useBookshelfInfoQuery({
    bookshelfId,
  });
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

    if (isAuthed) return data;

    return data.slice(0, 4);
  };

  const filteredData = filtered();

  const handleShareClick = () => {
    // TODO: 클릭시 해당 route 클립보드에 복사
    // TODO: 복사 이후 Toast로 알려주기
    console.log('복사 되었어요.');
  };

  return (
    <VStack width="100%" height="100%">
      <TopNavigation pageTitle={infoData.bookshelfName} />
      <IconButton
        name="share01"
        size="2.2rem"
        onClick={handleShareClick}
        cursor="pointer"
        style={{
          zIndex: 10,
          position: 'absolute',
          top: '1.6rem',
          right: '2.4rem',
        }}
        // MEMO: Icon top, right 위치
        // 1.6 / 2.4
        // 1.9 / 2
        // 1.9 / 2
      />
      <HStack width="100%" height="3rem" gap="0.08rem" px="1rem">
        <UserJobInfoTag tag={infoData.job.jobGroupKoreanName} />
        {infoData.job.jobNameKoreanName && (
          <UserJobInfoTag tag={infoData.job.jobNameKoreanName} />
        )}
      </HStack>
      <VStack width="100%" spacing="2rem">
        {isAuthed ? (
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
                  src="/images/kakao.svg"
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

export const getServerSideProps: GetServerSideProps = async context => {
  const { bookshelfId } = context.query;

  return {
    props: {
      bookshelfId: Number(bookshelfId),
    },
  };
};
