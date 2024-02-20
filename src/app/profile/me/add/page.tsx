'use client';

import { Suspense } from 'react';
import useAllJobQuery from '@/queries/job/useAllJobQuery';

import { checkAuthentication } from '@/utils/helpers';

import AddJobProfile from '@/v1/profile/AddJobProfile';

const AddJobProfilePage = () => {
  return (
    <Suspense fallback={null}>
      <Contents />
    </Suspense>
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
