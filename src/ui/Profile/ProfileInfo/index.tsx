import { ReactNode, Suspense } from 'react';
import MyProfileContainer from './MyProfileInfoContainer';
import UserProfileInfoContainer from './UserProfileInfoContainer';
import type { APIUser } from '@/types/user';

type ProfileInfoProps = { children?: ReactNode } & (
  | { isMe: true; userId?: undefined }
  | { isMe: false; userId: APIUser['userId'] }
);

const ProfileInfo = ({ isMe, userId, children }: ProfileInfoProps) => {
  return (
    <Suspense fallback={<>Loading...</>}>
      {isMe ? (
        <MyProfileContainer />
      ) : (
        <UserProfileInfoContainer userId={userId} />
      )}
      {children && children}
    </Suspense>
  );
};

export default ProfileInfo;
