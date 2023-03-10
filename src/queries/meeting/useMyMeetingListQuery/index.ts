import MeetingAPI from '@/apis/Meeting';
import { useQuery } from '@tanstack/react-query';

const useMyMeetingListQuery = () =>
  useQuery(['meetingList', 'me'], () =>
    MeetingAPI.getMyMeetingList().then(({ data }) => data)
  );

export default useMyMeetingListQuery;
