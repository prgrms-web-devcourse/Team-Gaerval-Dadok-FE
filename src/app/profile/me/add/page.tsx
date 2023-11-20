'use client';

import { Suspense } from 'react';
import useAllJobQuery from '@/queries/job/useAllJobQuery';

import { isAuthed } from '@/utils/helpers';
import AuthRequired from '@/ui/AuthRequired';

import CreateProfile from '@/v1/profile/CreateProfile';

const CreateProfilePage = () => {
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

  return allJobQuery.isSuccess ? (
    <CreateProfile jobGroups={allJobQuery.data.jobGroups} />
  ) : null;
};

export default CreateProfilePage;
