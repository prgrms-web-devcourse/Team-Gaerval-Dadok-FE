import MeetingAPI from '@/apis/meetingg';
import { APIMeetingDetail } from '@/types/meetingDetail';
import { useQuery } from '@tanstack/react-query';

const useMeetingCommentsQuery = ({
  bookGroupId,
}: {
  bookGroupId: APIMeetingDetail['bookGroupId'];
}) =>
  useQuery(['entireMeetingList', bookGroupId], () =>
    MeetingAPI.getMeetingDetailCommentsList({ bookGroupId }).then(
      response => response.data
    )
  );

export default useMeetingCommentsQuery;
