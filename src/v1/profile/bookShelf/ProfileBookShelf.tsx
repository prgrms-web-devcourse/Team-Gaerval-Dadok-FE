import type { APIUser } from '@/types/user';

import MyProfileBookshelfContainer from '@/v1/profile/bookShelf/MyProfileBookshelfContainer';
import UserProfileBookshelfContainer from '@/v1/profile/bookShelf/UserProfileBookshelfContainer';

const ProfileBookShelf = ({ userId }: { userId: 'me' | APIUser['userId'] }) => {
  return userId === 'me' ? (
    <MyProfileBookshelfContainer />
  ) : (
    <UserProfileBookshelfContainer userId={userId} />
  );
};

export default ProfileBookShelf;
