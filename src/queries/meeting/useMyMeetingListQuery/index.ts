import MeetingAPI from '@/apis/meeting';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type Options = Pick<
  UseQueryOptions<
    Awaited<ReturnType<typeof MeetingAPI.getMyMeetingList>>['data']
  >,
  'suspense'
>;

const useMyMeetingListQuery = (options?: Options) =>
  useQuery(
    ['meetingList', 'me'],
    () => MeetingAPI.getMyMeetingList().then(({ data }) => data),
    options
  );

export default useMyMeetingListQuery;
