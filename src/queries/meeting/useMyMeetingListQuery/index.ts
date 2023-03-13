import MeetingAPI from '@/apis/meeting';
import { useQuery } from '@tanstack/react-query';

const useMyMeetingListQuery = () =>
  useQuery(['meetingList', 'me'], () =>
    MeetingAPI.getMyMeetingList().then(({ data }) => data)
  );

export default useMyMeetingListQuery;
