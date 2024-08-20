import ProfileBookshelfPresenter from './ProfileBookshelfPresenter';
import useMySummaryBookshelfQuery from '@/queries/bookshelf/useMySummaryBookShelfQuery';

const MyProfileBookshelfContainer = () => {
  const { isSuccess, data } = useMySummaryBookshelfQuery({
    suspense: true,
  });

  if (!isSuccess) return null;

  return <ProfileBookshelfPresenter {...data}></ProfileBookshelfPresenter>;
};

export default MyProfileBookshelfContainer;
