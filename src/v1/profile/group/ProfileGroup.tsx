import SSRSafeSuspense from '@/v1/base/SSRSafeSuspense';

import { APIUser } from '@/types/user';

import ProfileGroupContainer from '@/v1/profile/group/ProfileGroupContainer';
import Skeleton from '@/v1/base/Skeleton';

const ProfileGroup = ({ userId }: { userId: 'me' | APIUser['userId'] }) => {
  return (
    <SSRSafeSuspense fallback={<ProfileGroupSkeleton />}>
      <ProfileGroupContainer userId={userId} />
    </SSRSafeSuspense>
  );
};

export default ProfileGroup;

const ProfileGroupSkeleton = () => {
  return (
    <Skeleton>
      <div className="flex flex-col gap-[1.5rem]">
        <Skeleton.Text fontSize="2xlarge" width="6rem" />
        <div className="flex gap-[1rem] overflow-scroll">
          <div className="flex flex-col gap-[1rem]">
            <Skeleton.Rect rounded="small" width="10rem" height="12.3rem" />
            <Skeleton.Text fontSize="small" width="10rem" />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Skeleton.Rect rounded="small" width="10rem" height="12.3rem" />
            <Skeleton.Text fontSize="small" width="10rem" />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Skeleton.Rect rounded="small" width="10rem" height="12.3rem" />
            <Skeleton.Text fontSize="small" width="10rem" />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Skeleton.Rect rounded="small" width="10rem" height="12.3rem" />
            <Skeleton.Text fontSize="small" width="10rem" />
          </div>
        </div>
      </div>
    </Skeleton>
  );
};
