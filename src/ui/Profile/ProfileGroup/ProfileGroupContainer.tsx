import useMyGroupsQuery from '@/queries/group/useMyGroupsQuery';
import ProfileGroupPresenter from './ProfileGroupPresenter';

const ProfileGroupContainer = () => {
  const { isSuccess, data } = useMyGroupsQuery({ suspense: true });

  if (!isSuccess) return null;

  return <ProfileGroupPresenter {...data} />;
};

export default ProfileGroupContainer;
