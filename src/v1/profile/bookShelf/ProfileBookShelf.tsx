import type { APIUser } from '@/types/user';

import MyProfileBookshelfContainer from './MyProfileBookshelfContainer';
import UserProfileBookshelfContainer from './UserProfileBookshelfContainer';

const ProfileBookShelf = ({ userId }: { userId: 'me' | APIUser['userId'] }) => {
  return userId === 'me' ? (
    <MyProfileBookshelfContainer />
  ) : (
    <UserProfileBookshelfContainer userId={userId} />
  );
};

export default ProfileBookShelf;
