import useMySummaryBookshlefQuery from '@/queries/bookshelf/useMySummaryBookshelfQuery';
import ProfileBookshelfPresenter from './ProfileBookshelfPresenter';

const ProfileBookshelfContainer = () => {
  const { isSuccess, data } = useMySummaryBookshlefQuery({ suspense: true });

  if (!isSuccess) return null;

  return <ProfileBookshelfPresenter {...data}></ProfileBookshelfPresenter>;
};

export default ProfileBookshelfContainer;
