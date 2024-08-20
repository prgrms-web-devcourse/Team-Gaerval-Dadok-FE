'use client';

import useAllJobQuery from '@/queries/job/useAllJobQuery';

import { checkAuthentication } from '@/utils/helpers';

import AddJobProfile from '@/v1/profile/AddJobProfile';
import SSRSafeSuspense from '@/components/SSRSafeSuspense';

const AddJobProfilePage = () => {
  return (
    <SSRSafeSuspense fallback={null}>
      <Contents />
    </SSRSafeSuspense>
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
