import { useQuery } from '@tanstack/react-query';

import { APIGroupDetail, BookGroupDetail } from '@/types/group';
import { QueryOptions } from '@/types/query';

import GroupAPI from '@/apis/group';
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
  select: QueryOptions<APIGroupDetail, TData>['select']
) =>
  useQuery({
    queryKey: bookGroupKeys.detail(groupId),
    queryFn: () =>
      GroupAPI.getGroupDetailInfo({ bookGroupId: groupId }).then(
        ({ data }) => data
      ),
    select,
  });

export const useBookGroup = (groupId: APIGroupDetail['bookGroupId']) =>
  useBookGroupQuery(groupId, transformBookGroupDetail);

export const useBookGroupTitle = (groupId: APIGroupDetail['bookGroupId']) =>
  useBookGroupQuery(groupId, data => data.title);
