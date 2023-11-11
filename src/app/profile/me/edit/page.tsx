'use client';

import { Suspense } from 'react';
import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import { isAuthed } from '@/utils/helpers';
import AuthRequired from '@/ui/AuthRequired';

import EditMyProfile from '@/v1/profile/EditMyProfile';

/**
 * @todo
 * Suspense 추가
 */

const EditMyProfilePage = () => {
  return (
    <AuthRequired>
      <Suspense fallback={null}>
        <Contents />
      </Suspense>
    </AuthRequired>
  );
};

const Contents = () => {
  const allJobQuery = useAllJobQuery({ enabled: isAuthed() });
  const { data: profileData } = useMyProfileQuery();

  return allJobQuery.isSuccess ? (
    <EditMyProfile
      profile={profileData}
      jobGroups={allJobQuery.data.jobGroups}
    />
  ) : null;
};

export default EditMyProfilePage;
