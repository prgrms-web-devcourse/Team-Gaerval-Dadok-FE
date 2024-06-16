'use client';

import useAllJobQuery from '@/queries/job/useAllJobQuery';

import { checkAuthentication } from '@/utils/helpers';

import SSRSafeSuspense from '@/v1/base/SSRSafeSuspense';
import withAuthRequired from '@/hocs/withAuthRequired';

import AddJobProfile from '@/v1/profile/AddJobProfile';

const AddJobProfilePage = () => {
  return (
    <SSRSafeSuspense fallback={null}>
      <Contents />
    </SSRSafeSuspense>
  );
};

export default withAuthRequired(AddJobProfilePage);

const Contents = () => {
  const isAuthenticated = checkAuthentication();
  const allJobQuery = useAllJobQuery({ enabled: isAuthenticated });

  return allJobQuery.isSuccess ? (
    <AddJobProfile jobCategories={allJobQuery.data.jobGroups} />
  ) : null;
};
