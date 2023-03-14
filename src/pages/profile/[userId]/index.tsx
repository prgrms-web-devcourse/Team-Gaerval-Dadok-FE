import useUserSummaryBookshlefQuery from '@/queries/bookshelf/useUserSummaryBookshelfQuery';
import useUserProfileQuery from '@/queries/user/useUserProfileQuery';
import { APIUser } from '@/types/user';
import TopNavigation from '@/ui/common/TopNavigation';
import ProfileBookshelf from '@/ui/Profile/ProfileBookshelf';
import ProfileInfo from '@/ui/Profile/ProfileInfo';
import { Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

const UserProfilePage = ({ userId }: { userId: APIUser['userId'] }) => {
  const userProfileQuery = useUserProfileQuery({ userId });
  const bookshelfQuery = useUserSummaryBookshlefQuery({ userId });

  if (userProfileQuery.isLoading || bookshelfQuery.isLoading)
    return (
      <VStack gap="2rem" align="stretch" w="100%" mt="4.8rem">
        <SkeletonCircle size="8rem" />
        <Skeleton height="3rem" />
        <Skeleton height="18rem" />
      </VStack>
    );

  return (
    <VStack justify="center" align="flex-start" w="100%">
      {userProfileQuery.isSuccess && (
        <TopNavigation
          pageTitle={`${userProfileQuery.data.nickname}님의 프로필`}
        />
      )}
      <VStack justify="flex-start" gap="2rem">
        {userProfileQuery.isSuccess && (
          <ProfileInfo {...userProfileQuery.data} />
        )}
        {bookshelfQuery.isSuccess && (
          <ProfileBookshelf {...bookshelfQuery.data} />
        )}
      </VStack>
    </VStack>
  );
};

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { userId } = context.query;

  return {
    props: {
      userId: Number(userId),
    },
  };
};
