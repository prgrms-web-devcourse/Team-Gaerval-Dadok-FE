import ProfileBookshelfPresenter from './ProfileBookshelfPresenter';
import useUserSummaryBookshelfQuery from '@/queries/bookshelf/useUserSummaryBookShelfQuery';
import type { APIUser } from '@/types/user';

const UserProfileBookshelfContainer = ({
  userId,
}: {
  userId: APIUser['userId'];
}) => {
  const { data } = useUserSummaryBookshelfQuery(userId);

  return <ProfileBookshelfPresenter {...data} />;
};

export default UserProfileBookshelfContainer;
