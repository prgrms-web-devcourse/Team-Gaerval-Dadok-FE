'use client';

import { Suspense } from 'react';
import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import { isAuthed } from '@/utils/helpers';
import AuthRequired from '@/ui/AuthRequired';

import EditProfile from '@/v1/profile/EditProfile';

/**
 * @todo
 * Fallback UI 추가하기
 */

const EditProfilePage = () => {
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
    <EditProfile profile={profileData} jobGroups={allJobQuery.data.jobGroups} />
  ) : null;
};

export default EditProfilePage;
