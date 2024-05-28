import useMyGroupsQuery from '@/queries/group/useMyGroupQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { APIUser } from '@/types/user';
import ProfileGroupPresenter from './ProfileGroupPresenter';

const ProfileGroupContainer = ({
  userId,
}: {
  userId: 'me' | APIUser['userId'];
}) => {
  const { data } = useMyGroupsQuery({ suspense: true });
  const {
    data: { userId: myId },
  } = useMyProfileQuery({ enabled: userId === 'me' });

  const isMeOwner = (ownerId: number) => ownerId === myId;

  return (
    <ProfileGroupPresenter userId={userId} isGroupOwner={isMeOwner} {...data} />
  );
};

export default ProfileGroupContainer;
