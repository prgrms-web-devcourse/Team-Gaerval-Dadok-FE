import ProfileBookshelfPresenter from './ProfileBookshelfPresenter';
import useMySummaryBookshlefQuery from '@/queries/bookshelf/useMySummaryBookshelfQuery';

const MyProfileBookshelfContainer = () => {
  const { isSuccess, data } = useMySummaryBookshlefQuery({
    suspense: true,
  });

  if (!isSuccess) return null;

  return <ProfileBookshelfPresenter {...data}></ProfileBookshelfPresenter>;
};

export default MyProfileBookshelfContainer;
