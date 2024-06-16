import useUserProfileQuery from '@/queries/user/useUserProfileQuery';
import type { APIUser } from '@/types/user';

import ProfileInfoPresenter from '@/components/profile/info/ProfileInfoPresenter';

const UserProfileInfoContainer = ({
  userId,
}: {
  userId: APIUser['userId'];
}) => {
  const { data } = useUserProfileQuery(userId);

  return <ProfileInfoPresenter {...data} />;
};

export default UserProfileInfoContainer;
