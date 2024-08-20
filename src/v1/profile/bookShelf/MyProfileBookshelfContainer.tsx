import useMySummaryBookshelfQuery from '@/queries/bookshelf/useMySummaryBookShelfQuery';

import ProfileBookshelfPresenter from '@/v1/profile/bookShelf/ProfileBookshelfPresenter';

const MyProfileBookshelfContainer = () => {
  const { data } = useMySummaryBookshelfQuery();

  return <ProfileBookshelfPresenter {...data} />;
};

export default MyProfileBookshelfContainer;
