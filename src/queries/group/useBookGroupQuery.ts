import { UseQueryOptions } from '@tanstack/react-query';

import { APIGroupDetail, BookGroupDetail } from '@/types/group';
import { isExpired } from '@/utils/date';
import GroupAPI from '@/apis/group';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';

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
      GroupAPI.getGroupDetailInfo({ bookGroupId: groupId }).then(
        ({ data }) => data
      ),
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
      title: data.title,
      description: data.introduce,
      maxMemberCount: data.maxMemberCount,
      startDate: data.startDate,
      endDate: data.endDate,
    }),
  });
