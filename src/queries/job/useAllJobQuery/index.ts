import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import jobAPI from '@/apis/job';

import jobKeys from '@/queries/job/key';

type Options = Pick<
  UseQueryOptions<Awaited<ReturnType<typeof jobAPI.getAllJobs>>['data']>,
  'enabled'
>;

const useAllJobQuery = (options?: Options) =>
  useQuery(
    jobKeys.category(),
    () => jobAPI.getAllJobs().then(response => response.data),
    { ...options, staleTime: Infinity }
  );

export default useAllJobQuery;
