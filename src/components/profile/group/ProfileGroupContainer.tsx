import useMyGroupsQuery from '@/queries/group/useMyGroupQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import type { APIUser } from '@/types/user';

import { checkAuthentication } from '@/utils/helpers';

import ProfileGroupPresenter from '@/components/profile/group/ProfileGroupPresenter';

const ProfileGroupContainer = ({
  userId,
}: {
  userId: 'me' | APIUser['userId'];
}) => {
  const isAuthenticated = checkAuthentication();

  const { data } = useMyGroupsQuery({ enabled: isAuthenticated });
  const {
    data: { userId: myId },
  } = useMyProfileQuery({ enabled: userId === 'me' });

  const isMeOwner = (ownerId: number) => ownerId === myId;

  return (
    <ProfileGroupPresenter userId={userId} isGroupOwner={isMeOwner} {...data} />
  );
};

export default ProfileGroupContainer;
