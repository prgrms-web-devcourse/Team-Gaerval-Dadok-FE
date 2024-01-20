'use client';

import { Suspense } from 'react';
import useAllJobQuery from '@/queries/job/useAllJobQuery';

import { checkAuthentication } from '@/utils/helpers';
import AuthRequired from '@/ui/AuthRequired';

import AddJobProfile from '@/v1/profile/AddJobProfile';

const AddJobProfilePage = () => {
  return (
    <AuthRequired>
      <Suspense fallback={null}>
        <Contents />
      </Suspense>
    </AuthRequired>
  );
};

const Contents = () => {
  const isAuthenticated = checkAuthentication();
  const allJobQuery = useAllJobQuery({ enabled: isAuthenticated });

  return allJobQuery.isSuccess ? (
    <AddJobProfile jobCategories={allJobQuery.data.jobGroups} />
  ) : null;
};

export default AddJobProfilePage;
