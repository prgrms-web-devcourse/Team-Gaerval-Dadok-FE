import type { APIUser } from '@/types/user';

import SSRSafeSuspense from '@/v1/base/SSRSafeSuspense';

import MyProfileContainer from '@/v1/profile/info/MyProfileInfoContainer';
import UserProfileInfoContainer from '@/v1/profile/info/UserProfileInfoContainer';
import Skeleton from '@/v1/base/Skeleton';

type ProfileInfoProps = {
  userId: 'me' | APIUser['userId'];
};

const ProfileInfo = ({ userId }: ProfileInfoProps) => {
  return (
    <SSRSafeSuspense fallback={<ProfileInfoSkeleton />}>
      {userId === 'me' ? (
        <MyProfileContainer />
      ) : (
        <UserProfileInfoContainer userId={userId} />
      )}
    </SSRSafeSuspense>
  );
};

export default ProfileInfo;

const ProfileInfoSkeleton = () => {
  return (
    <Skeleton>
      <div className="mb-[2rem] flex flex-col gap-[2rem]">
        <div className="flex gap-[0.8rem]">
          <Skeleton.Rect width="3.8rem" height="2.1rem" />
          <Skeleton.Rect width="10.4rem" height="2.1rem" />
        </div>
        <div className="flex items-center gap-[1rem]">
          <Skeleton.Circle size="large" />
          <Skeleton.Text fontSize="2xlarge" width="18rem" />
        </div>
      </div>
    </Skeleton>
  );
};
