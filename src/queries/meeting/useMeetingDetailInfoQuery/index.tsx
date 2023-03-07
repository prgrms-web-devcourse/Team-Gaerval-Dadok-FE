import MeetingAPI from '@/apis/Meeting';
import { useQuery } from '@tanstack/react-query';
import { APIMeetingDetail } from '@/types/meetingDetail';

const useMeetingDetailInfoQuery = ({
  bookGroupId,
}: {
  bookGroupId: APIMeetingDetail['bookGroupId'];
}) => {
  return useQuery(['meetingDetailInfo', bookGroupId], () =>
    MeetingAPI.getMeetingDetailInfo({ bookGroupId }).then(
      ({data}) => data
    )
  );
};

export default useMeetingDetailInfoQuery;
