'use client';

import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import { checkAuthentication } from '@/utils/helpers';

import EditProfile from '@/v1/profile/EditProfile';
import SSRSafeSuspense from '@/components/SSRSafeSuspense';

/**
 * @todo
 * Fallback UI 추가하기
 */

const EditProfilePage = () => {
  return (
    <SSRSafeSuspense fallback={null}>
      <Contents />
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
