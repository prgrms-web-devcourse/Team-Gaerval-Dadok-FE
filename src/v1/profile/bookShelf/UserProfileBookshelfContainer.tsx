import ProfileBookshelfPresenter from './ProfileBookshelfPresenter';
import useUserSummaryBookshelfQuery from '@/queries/bookshelf/useUserSummaryBookShelfQuery';
import type { APIUser } from '@/types/user';

const UserProfileBookshelfContainer = ({
  userId,
}: {
  userId: APIUser['userId'];
}) => {
  const { isSuccess, data } = useUserSummaryBookshelfQuery(userId, {
    suspense: true,
  });

  if (!isSuccess) return null;

  return <ProfileBookshelfPresenter {...data}></ProfileBookshelfPresenter>;
};

export default UserProfileBookshelfContainer;
