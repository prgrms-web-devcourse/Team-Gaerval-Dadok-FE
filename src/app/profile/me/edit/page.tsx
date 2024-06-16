'use client';

import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import { checkAuthentication } from '@/utils/helpers';

import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import withAuthRequired from '@/hocs/withAuthRequired';

import EditProfile from '@/components/profile/EditProfile';
import Loading from '@/components/common/Loading';

const EditProfilePage = () => {
  return (
    <SSRSafeSuspense fallback={<Loading fullpage />}>
      <Contents />
    </SSRSafeSuspense>
  );
};

export default withAuthRequired(EditProfilePage);

const Contents = () => {
  const isAuthenticated = checkAuthentication();
  const allJobQuery = useAllJobQuery({ enabled: isAuthenticated });
  const { data: profileData } = useMyProfileQuery();

  return allJobQuery.isSuccess ? (
    <EditProfile profile={profileData} jobGroups={allJobQuery.data.jobGroups} />
  ) : null;
};
