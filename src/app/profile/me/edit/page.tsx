'use client';

import { Suspense } from 'react';
import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import { checkAuthentication } from '@/utils/helpers';

import EditProfile from '@/v1/profile/EditProfile';

/**
 * @todo
 * Fallback UI 추가하기
 */

const EditProfilePage = () => {
  return (
    <Suspense fallback={null}>
      <Contents />
    </Suspense>
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
