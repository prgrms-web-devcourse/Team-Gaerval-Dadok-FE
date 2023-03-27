import {
  APICreateGroup,
  APIGroupPagination,
  APIGroup,
  APIGroupDetail,
  APIGroupComment,
  APIGroupCommentPagination,
} from '@/types/group';
import { publicApi } from '../core/axios';

const GroupAPI = {
  getEntireGroups: () =>
    publicApi.get<APIGroupPagination>(`/service-api/book-groups`, {
      params: {
        pageSize: 100,
        sortDirection: 'DESC',
      },
    }),

  createGroup: ({ group }: { group: APICreateGroup }) =>
    publicApi.post('/service-api/book-groups', group),

  getGroupDetailInfo: ({
    bookGroupId,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
  }) =>
    publicApi.get<APIGroupDetail>(`/service-api/book-groups/${bookGroupId}`),

  getGroupComments: ({
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
  joinGroup: ({
    bookGroupId,
    password = null,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
    password?: string | null;
  }) =>
    publicApi.post(`/service-api/book-groups/${bookGroupId}/join`, {
      joinPasswd: password ? password : null,
    }),
  createGroupComment: ({
    bookGroupId,
    comment,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
    comment: string;
  }) =>
    publicApi.post(`/service-api/book-groups/${bookGroupId}/comments`, {
      comment,
    }),

  getMyGroups: () =>
    publicApi.get<APIGroupPagination>('/service-api/book-groups/me', {
      params: {
        pageSize: 10,
        sortDirection: 'DESC',
      },
    }),

  updateGroupInfo: ({
    bookGroupId,
    group,
  }: {
    bookGroupId: APIGroupDetail['bookGroupId'];
    group: Pick<
      APIGroupDetail,
      'title' | 'introduce' | 'endDate' | 'maxMemberCount'
    >;
  }) => publicApi.patch(`/service-api/book-groups/${bookGroupId}`, group),

  deleteGroup: ({ bookGroupId }: { bookGroupId: APIGroup['bookGroupId'] }) =>
    publicApi.delete(`/service-api/book-groups/${bookGroupId}`),

  deleteGroupComment: ({
    bookGroupId,
    commentId,
  }: {
    bookGroupId: APIGroup['bookGroupId'];
    commentId: APIGroupComment['commentId'];
  }) =>
    publicApi.delete(
      `/service-api/book-groups/${bookGroupId}/comments/${commentId}`
    ),

  updateGroupComment: ({
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

export default GroupAPI;
