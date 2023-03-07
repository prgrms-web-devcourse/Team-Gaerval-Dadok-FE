import { APICreateMeetingReqeust, APIEntireMeetingList } from '@/types/meeting';
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

  createMeeting: ({ meeting }: { meeting: APICreateMeetingReqeust }) =>
    publicApi.post('/api/book-groups', meeting),
};

export default MeetingAPI;
