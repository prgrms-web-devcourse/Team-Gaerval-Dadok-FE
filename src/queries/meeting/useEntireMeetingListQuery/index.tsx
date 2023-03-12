import MeetingAPI from '@/apis/Meeting';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type Options = Pick<
  UseQueryOptions<
    Awaited<ReturnType<typeof MeetingAPI.getEntireMeetingList>>['data']
  >,
  'suspense'
>;

const useEntireMeetingListQuery = (options?: Options) =>
  useQuery(
    ['entireMeetingList'],
    () => MeetingAPI.getEntireMeetingList().then(response => response.data),
    options
  );

export default useEntireMeetingListQuery;
