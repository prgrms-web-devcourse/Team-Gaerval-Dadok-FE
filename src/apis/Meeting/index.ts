import { APIEntireMeetingList } from '@/types/meeting';
import { publicApi } from '../core/axios';
import { APIMeetingGroup } from '@/types/meeting';
import { APIMeetingDetail } from '@/types/meetingDetail';

const MeetingAPI = {
  getEntireMeetingList: () =>
    publicApi.get<APIEntireMeetingList>(`/api/book-groups`, {
      params: {
        pageSize: 10,
        groupCursorId: 999,
        sortDirection: 'DESC',
      },
    }),
  getMeetingDetailInfo: ({
    bookGroupId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
  }) => publicApi.get<APIMeetingDetail>(`/api/book-groups/${bookGroupId}`),
};

export default MeetingAPI;
