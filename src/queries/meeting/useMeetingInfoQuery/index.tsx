import MeetingAPI from '@/apis/meeting';
import { useQuery } from '@tanstack/react-query';
import { APIMeetingDetail } from '@/types/meetingDetail';

const useMeetingInfoQuery = ({
  bookGroupId,
}: {
  bookGroupId: APIMeetingDetail['bookGroupId'];
}) => {
  return useQuery(['meetingDetailInfo', bookGroupId], () =>
    MeetingAPI.getMeetingDetailInfo({ bookGroupId }).then(({ data }) => data)
  );
};

export default useMeetingInfoQuery;
