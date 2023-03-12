import {
  APICreateMeetingReqeust,
  APIEntireMeetingList,
  APIMeetingGroup,
} from '@/types/meeting';
import { APIMeetingDetailCommentsList } from '@/types/meetingDetailCommentsList';
import { APIMeetingDetail } from '@/types/meetingDetail';
import { publicApi } from '../core/axios';
import { APIBookGroupComments } from '@/types/meetingDetailCommentsList';

const MeetingAPI = {
  getEntireMeetingList: () =>
    publicApi.get<APIEntireMeetingList>(`/service-api/book-groups`, {
      params: {
        pageSize: 10,
        groupCursorId: 999,
        sortDirection: 'DESC',
      },
    }),

  createMeeting: ({ meeting }: { meeting: APICreateMeetingReqeust }) =>
    publicApi.post('/service-api/book-groups', meeting),

  getMeetingDetailInfo: ({
    bookGroupId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
  }) =>
    publicApi.get<APIMeetingDetail>(`/service-api/book-groups/${bookGroupId}`),

  getMeetingDetailCommentsList: ({
    bookGroupId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
  }) =>
    publicApi.get<APIMeetingDetailCommentsList>(
      `/service-api/book-groups/${bookGroupId}/comments`,
      {
        params: {
          groupCommentCursorId: 999,
          pageSize: 10,
          sortDirection: 'DESC',
        },
      }
    ),
  postMeetingJoin: ({
    bookGroupId,
    password = null,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
    password?: string | null;
  }) =>
    publicApi.post(`/service-api/book-groups/${bookGroupId}/join`, {
      joinPasswd: password ? password : null,
    }),
  createMeetingComment: ({
    bookGroupId,
    comment,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
    comment: string;
  }) =>
    publicApi.post(`/service-api/book-groups/${bookGroupId}/comments`, {
      comment,
    }),

  getMyMeetingList: () =>
    publicApi.get<APIEntireMeetingList>('/service-api/book-groups/me', {
      params: {
        pageSize: 10,
        groupCursorId: 999,
        sortDirection: 'DESC',
      },
    }),

  patchMeetingDetailInfo: ({
    bookGroupId,
    meeting,
  }: {
    bookGroupId: APIMeetingDetail['bookGroupId'];
    meeting: Pick<
      APIMeetingDetail,
      'title' | 'introduce' | 'endDate' | 'maxMemberCount'
    >;
  }) => publicApi.patch(`/service-api/book-groups/${bookGroupId}`, meeting),

  deleteMeeting: ({
    bookGroupId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
  }) => publicApi.delete(`/service-api/book-groups/${bookGroupId}`),

  deleteComment: ({
    bookGroupId,
    commentId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
    commentId: APIBookGroupComments['commentId'];
  }) =>
    publicApi.delete(
      `/service-api/book-groups/${bookGroupId}/comments${commentId}`
    ),

  patchMeetingComment: ({
    bookGroupId,
    commentId,
    comment,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
    commentId: number;
    comment: string;
  }) =>
    publicApi.patch(
      `/service-api/book-groups/${bookGroupId}/comments/${commentId}`,
      {
        comment,
      }
    ),
};

export default MeetingAPI;
