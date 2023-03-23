import {
  APICreateGroup,
  APIGroupPagination,
  APIGroup,
  APIGroupDetail,
  APIGroupComment,
  APIGroupCommentPagination,
} from '@/types/group';
import { publicApi } from '../core/axios';

const MeetingAPI = {
  getEntireMeetingList: () =>
    publicApi.get<APIGroupPagination>(`/service-api/book-groups`, {
      params: {
        pageSize: 100,
        sortDirection: 'DESC',
      },
    }),

  createMeeting: ({ meeting }: { meeting: APICreateGroup }) =>
    publicApi.post('/service-api/book-groups', meeting),

  getMeetingDetailInfo: ({
    bookGroupId,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
  }) =>
    publicApi.get<APIGroupDetail>(`/service-api/book-groups/${bookGroupId}`),

  getMeetingDetailCommentsList: ({
    bookGroupId,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
  }) =>
    publicApi.get<APIGroupCommentPagination>(
      `/service-api/book-groups/${bookGroupId}/comments`,
      {
        params: {
          pageSize: 100,
          sortDirection: 'DESC',
        },
      }
    ),
  postMeetingJoin: ({
    bookGroupId,
    password = null,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
    password?: string | null;
  }) =>
    publicApi.post(`/service-api/book-groups/${bookGroupId}/join`, {
      joinPasswd: password ? password : null,
    }),
  createMeetingComment: ({
    bookGroupId,
    comment,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
    comment: string;
  }) =>
    publicApi.post(`/service-api/book-groups/${bookGroupId}/comments`, {
      comment,
    }),

  getMyMeetingList: () =>
    publicApi.get<APIGroupPagination>('/service-api/book-groups/me', {
      params: {
        pageSize: 10,
        sortDirection: 'DESC',
      },
    }),

  patchMeetingDetailInfo: ({
    bookGroupId,
    meeting,
  }: {
    bookGroupId: APIGroupDetail['bookGroupId'];
    meeting: Pick<
      APIGroupDetail,
      'title' | 'introduce' | 'endDate' | 'maxMemberCount'
    >;
  }) => publicApi.patch(`/service-api/book-groups/${bookGroupId}`, meeting),

  deleteMeeting: ({ bookGroupId }: { bookGroupId: APIGroup['bookGroupId'] }) =>
    publicApi.delete(`/service-api/book-groups/${bookGroupId}`),

  deleteComment: ({
    bookGroupId,
    commentId,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
    commentId: APIGroupComment['commentId'];
  }) =>
    publicApi.delete(
      `/service-api/book-groups/${bookGroupId}/comments/${commentId}`
    ),

  patchMeetingComment: ({
    bookGroupId,
    commentId,
    comment,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
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
