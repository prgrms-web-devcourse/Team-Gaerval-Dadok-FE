import {
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import type {
  APIGroupDetail,
  BookGroupDetail,
  APIEditBookGroup,
} from '@/types/group';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import groupAPI from '@/apis/group';
import { isExpired } from '@/utils/date';

import bookGroupKeys from './key';

const transformBookGroupDetail = (data: APIGroupDetail) =>
  ({
    title: data.title,
    description: data.introduce,
    bookId: data.book.id,
    owner: { isMe: data.isOwner, id: data.owner.id },
    date: { start: data.startDate, end: data.endDate },
    memberCount: { current: data.currentMemberCount, max: data.maxMemberCount },
    isPublic: data.isPublic,
    isMember: data.isGroupMember,
  } as BookGroupDetail);

export const useBookGroupQuery = <TData = APIGroupDetail>(
  groupId: APIGroupDetail['bookGroupId'],
  options?: UseQueryOptions<APIGroupDetail, unknown, TData>
) =>
  useQueryWithSuspense(
    bookGroupKeys.detail(groupId),
    () =>
      groupAPI
        .getGroupDetailInfo({ bookGroupId: groupId })
        .then(({ data }) => data),
    options
  );

export default useBookGroupQuery;

export const useBookGroup = (groupId: APIGroupDetail['bookGroupId']) =>
  useBookGroupQuery(groupId, {
    select: transformBookGroupDetail,
  });

export const useBookGroupTitle = (groupId: APIGroupDetail['bookGroupId']) =>
  useBookGroupQuery(groupId, { select: data => data.title });

export const useBookGroupOwner = (groupId: APIGroupDetail['bookGroupId']) =>
  useBookGroupQuery(groupId, {
    select: data => ({ isMe: data.isOwner, id: data.owner.id }),
  });

export const useBookGroupJoinInfo = (groupId: APIGroupDetail['bookGroupId']) =>
  useBookGroupQuery(groupId, {
    select: data => ({
      isExpired: isExpired(data.endDate),
      isMember: data.isGroupMember,
      hasPassword: data.hasJoinPasswd,
      question: data.joinQuestion,
    }),
  });

export const useBookGroupEditCurrentInfo = (
  groupId: APIGroupDetail['bookGroupId']
) =>
  useBookGroupQuery(groupId, {
    select: data => ({
      isOwner: data.isOwner,
      title: data.title,
      description: data.introduce,
      maxMemberCount: data.maxMemberCount,
      startDate: data.startDate,
      endDate: data.endDate,
    }),
  });

export const useBookGroupInfoMutation = (
  bookGroupId: APIGroupDetail['bookGroupId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (group: Omit<APIEditBookGroup, 'isOwner' | 'startDate'>) =>
      groupAPI.updateGroupInfo({ bookGroupId, group }).then(({ data }) => data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: bookGroupKeys.detail(bookGroupId),
      }),
  });
};
