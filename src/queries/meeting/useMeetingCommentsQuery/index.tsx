import MeetingAPI from '@/apis/meeting';
import { APIGroupDetail } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

const useMeetingCommentsQuery = ({
  bookGroupId,
}: {
  bookGroupId: APIGroupDetail['bookGroupId'];
}) =>
  useQuery(['entireMeetingList', bookGroupId], () =>
    MeetingAPI.getMeetingDetailCommentsList({ bookGroupId }).then(
      response => response.data
    )
  );

export default useMeetingCommentsQuery;
