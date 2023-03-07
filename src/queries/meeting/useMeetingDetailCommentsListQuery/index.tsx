import MeetingAPI from '@/apis/Meeting';
import { useQuery } from '@tanstack/react-query';

const useEntireMeetingListQuery = () =>
  useQuery(['entireMeetingList'], () =>
    MeetingAPI.getEntireMeetingList().then(response => response.data)
  );

export default useEntireMeetingListQuery;
