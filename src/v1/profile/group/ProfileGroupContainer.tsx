import useMyGroupsQuery from '@/queries/group/useMyGroupQuery';
import { APIUser } from '@/types/user';
import ProfileGroupPresenter from './ProfileGroupPresenter';

const ProfileGroupContainer = ({
  userId,
}: {
  userId: 'me' | APIUser['userId'];
}) => {
  const { isSuccess, data } = useMyGroupsQuery({ suspense: true });

  if (!isSuccess) return null;

  return <ProfileGroupPresenter userId={userId} {...data} />;
};

export default ProfileGroupContainer;
