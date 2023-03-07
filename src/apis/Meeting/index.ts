import { APIEntireMeetingList } from '@/types/meeting';
import { publicApi } from '../core/axios';

const MeetingAPI = {
  getEntireMeetingList: () =>
    publicApi.get<APIEntireMeetingList>(`/api/book-groups`, {
      params: {
        pageSize: 10,
        groupCursorId: 999,
        sortDirection: 'DESC',
      },
    }),
};

export default MeetingAPI;
