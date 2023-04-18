import useUserProfileQuery from '@/queries/user/useUserProfileQuery';
import ProfileInfoPresenter from './ProfileInfoPresenter';
import type { APIUser } from '@/types/user';

const UserProfileInfoContainer = ({
  userId,
}: {
  userId: APIUser['userId'];
}) => {
  const { isSuccess, data } = useUserProfileQuery({
    userId,
    options: { suspense: true },
  });

  if (!isSuccess) return null;

  return <ProfileInfoPresenter {...data}></ProfileInfoPresenter>;
};

export default UserProfileInfoContainer;
