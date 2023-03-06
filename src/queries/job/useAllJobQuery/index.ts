import jobAPI from '@/apis/job';
import { useQuery } from '@tanstack/react-query';

const useAllJobQuery = () =>
  useQuery(['allJob'], () =>
    jobAPI.getAllJobs().then(response => response.data)
  );

export default useAllJobQuery;
