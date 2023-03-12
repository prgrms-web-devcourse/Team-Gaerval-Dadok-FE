import useUserSummaryBookshlefQuery from '@/queries/bookshelf/useUserSummaryBookshelfQuery';
import useUserProfileQuery from '@/queries/user/useUserProfileQuery';
import { APIUser } from '@/types/user';
import TopNavigation from '@/ui/common/TopNavigation';
import ProfileBookshelf from '@/ui/ProfileBookshelf';
import ProfileInfo from '@/ui/ProfileInfo';
import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

const UserProfilePage = ({ userId }: { userId: APIUser['userId'] }) => {
  const userProfileQuery = useUserProfileQuery({ userId });
  const bookshelfQuery = useUserSummaryBookshlefQuery({ userId });

  return (
    <>
      {userProfileQuery.isSuccess && (
        <TopNavigation
          pageTitle={`${userProfileQuery.data.nickname}님의 프로필`}
        />
      )}
      <Flex direction="column" justify="center" gap="2rem">
        {userProfileQuery.isSuccess && (
          <ProfileInfo {...userProfileQuery.data} />
        )}
        {bookshelfQuery.isSuccess && (
          <ProfileBookshelf {...bookshelfQuery.data} />
        )}
      </Flex>
    </>
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
