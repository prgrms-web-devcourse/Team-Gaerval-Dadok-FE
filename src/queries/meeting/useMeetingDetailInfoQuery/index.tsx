import MeetingAPI from '@/apis/Meeting';
import { useQuery } from '@tanstack/react-query';
import { APIMeetingDetail } from '@/types/meetingDetail';

const useMeetingDetailInfoQuery = ({
  bookGroupId,
}: {
  bookGroupId: APIMeetingDetail['bookGroupId'];
}) => {
  useQuery(['meetingDetailInfo', bookGroupId], () =>
    MeetingAPI.getMeetingDetailInfo({ bookGroupId }).then(
      response => response.data
    )
  );
};

export default useMeetingDetailInfoQuery;
