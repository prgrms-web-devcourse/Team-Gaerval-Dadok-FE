import MeetingAPI from '@/apis/meeting';
import { useQuery } from '@tanstack/react-query';
import { APIGroupDetail } from '@/types/group';

const useMeetingInfoQuery = ({
  bookGroupId,
}: {
  bookGroupId: APIGroupDetail['bookGroupId'];
}) => {
  return useQuery(['meetingDetailInfo', bookGroupId], () =>
    MeetingAPI.getMeetingDetailInfo({ bookGroupId }).then(({ data }) => data)
  );
};

export default useMeetingInfoQuery;
