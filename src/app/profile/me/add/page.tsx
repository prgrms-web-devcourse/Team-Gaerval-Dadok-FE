'use client';

import useAllJobQuery from '@/queries/job/useAllJobQuery';

import { checkAuthentication } from '@/utils/helpers';

import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import withAuthRequired from '@/hocs/withAuthRequired';

import AddJobProfile from '@/components/profile/AddJobProfile';

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
