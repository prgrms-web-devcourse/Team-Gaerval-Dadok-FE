import { APIEntireMeetingList } from '@/types/meeting';
import { APIMeetingDetailCommentsList } from '@/types/meetingDetailCommentsList';
import { APIMeetingGroup } from '@/types/meeting';
import { publicApi } from '../core/axios';
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
  getMeetingDetailCommentsList: ({
    bookGroupId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
  }) =>
    publicApi.get<APIMeetingDetailCommentsList>(
      `/api/book-groups/${bookGroupId}/comments`,
      {
        params: {
          groupCommentCursorId: 100,
          pageSize: 10,
          sortDirection: 'DESC',
        },
      }
    ),
};

export default MeetingAPI;
