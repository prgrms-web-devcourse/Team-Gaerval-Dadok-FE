import useUserSummaryBookshelfQuery from '@/queries/bookshelf/useUserSummaryBookShelfQuery';
import type { APIUser } from '@/types/user';

import ProfileBookshelfPresenter from '@/v1/profile/bookShelf/ProfileBookshelfPresenter';

const UserProfileBookshelfContainer = ({
  userId,
}: {
  userId: APIUser['userId'];
}) => {
  const { data } = useUserSummaryBookshelfQuery(userId);

  return <ProfileBookshelfPresenter {...data} />;
};

export default UserProfileBookshelfContainer;
