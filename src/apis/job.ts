import { APIAllJob } from '@/types/job';
import { publicApi } from './core/axios';

const jobAPI = {
  getAllJobs: () => publicApi.get<APIAllJob>(`/service-api/jobs`),
};

export default jobAPI;
