import jobAPI from '@/apis/job';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type Options = Pick<
  UseQueryOptions<Awaited<ReturnType<typeof jobAPI.getAllJobs>>['data']>,
  'enabled'
>;

const useAllJobQuery = (options?: Options) =>
  useQuery(
    ['allJob'],
    () => jobAPI.getAllJobs().then(response => response.data),
    options
  );

export default useAllJobQuery;
