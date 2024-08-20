import ProfileBookshelfPresenter from './ProfileBookshelfPresenter';
import useUserSummaryBookshlefQuery from '@/queries/bookshelf/useUserSummaryBookshelfQuery';
import type { APIUser } from '@/types/user';

const UserProfileBookshelfContainer = ({
  userId,
}: {
  userId: APIUser['userId'];
}) => {
  const { isSuccess, data } = useUserSummaryBookshlefQuery(userId, {
    suspense: true,
  });

  if (!isSuccess) return null;

  return <ProfileBookshelfPresenter {...data}></ProfileBookshelfPresenter>;
};

export default UserProfileBookshelfContainer;
