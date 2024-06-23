import type { APIUser } from '@/types/user';

import MyProfileBookshelfContainer from '@/components/profile/bookShelf/MyProfileBookshelfContainer';
import UserProfileBookshelfContainer from '@/components/profile/bookShelf/UserProfileBookshelfContainer';

const ProfileBookShelf = ({ userId }: { userId: 'me' | APIUser['userId'] }) => {
  return userId === 'me' ? (
    <MyProfileBookshelfContainer />
  ) : (
    <UserProfileBookshelfContainer userId={userId} />
  );
};

export default ProfileBookShelf;
