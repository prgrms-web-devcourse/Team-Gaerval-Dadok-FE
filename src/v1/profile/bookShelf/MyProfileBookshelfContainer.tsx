import ProfileBookshelfPresenter from './ProfileBookshelfPresenter';
import useMySummaryBookshelfQuery from '@/queries/bookshelf/useMySummaryBookShelfQuery';

const MyProfileBookshelfContainer = () => {
  const { data } = useMySummaryBookshelfQuery();

  return <ProfileBookshelfPresenter {...data} />;
};

export default MyProfileBookshelfContainer;
