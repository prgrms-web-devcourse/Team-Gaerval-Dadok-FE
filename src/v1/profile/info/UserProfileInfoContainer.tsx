import useUserProfileQuery from '@/queries/user/useUserProfileQuery';
import ProfileInfoPresenter from './ProfileInfoPresenter';
import type { APIUser } from '@/types/user';

const UserProfileInfoContainer = ({
  userId,
}: {
  userId: APIUser['userId'];
}) => {
  const { data } = useUserProfileQuery(userId);

  return <ProfileInfoPresenter {...data}></ProfileInfoPresenter>;
};

export default UserProfileInfoContainer;
