'use client';

import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import { checkAuthentication } from '@/utils/helpers';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import withAuthRequired from '@/hocs/withAuthRequired';

import EditProfile from '@/v1/profile/EditProfile';
import Loading from '@/v1/base/Loading';

const EditProfilePage = () => {
  const AuthRequiredContents = withAuthRequired(Contents);

  return (
    <SSRSafeSuspense fallback={<Loading fullpage />}>
      <AuthRequiredContents />
    </SSRSafeSuspense>
  );
};

const Contents = () => {
  const isAuthenticated = checkAuthentication();
  const allJobQuery = useAllJobQuery({ enabled: isAuthenticated });
  const { data: profileData } = useMyProfileQuery();

  return allJobQuery.isSuccess ? (
    <EditProfile profile={profileData} jobGroups={allJobQuery.data.jobGroups} />
  ) : null;
};

export default EditProfilePage;
