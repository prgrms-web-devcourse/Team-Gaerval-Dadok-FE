import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import ProfileInfoPresenter from '@/components/profile/info/ProfileInfoPresenter';

const MyProfileContainer = () => {
  const { data } = useMyProfileQuery();
  return <ProfileInfoPresenter {...data} />;
};

export default MyProfileContainer;
