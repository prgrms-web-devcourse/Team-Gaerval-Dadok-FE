import MeetingAPI from '@/apis/meetingg';
import { APIMeetingDetail } from '@/types/meetingDetail';
import TopNavigation from '@/ui/common/TopNavigation';
import { EditMeetingForm } from '@/ui/MeetingForm';
import { VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useCallback, useEffect, useState } from 'react';

const MeetingEditPage = ({ meetingId }: { meetingId: number }) => {
  const [meeting, setMeeting] = useState<APIMeetingDetail>();

  const getMeeting = useCallback(async () => {
    try {
      const { data } = await MeetingAPI.getMeetingDetailInfo({
        bookGroupId: meetingId,
      });
      setMeeting(data);
    } catch (error) {
      console.error(error);
    }
  }, [meetingId]);

  useEffect(() => {
    getMeeting();
  }, [getMeeting]);

  return (
    <VStack justify="center" align="center">
      <TopNavigation pageTitle="모임 수정" />
      {meeting && <EditMeetingForm meeting={meeting} />}
    </VStack>
  );
};

export default MeetingEditPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { meetingId } = context.query;

  return {
    props: {
      meetingId: Number(meetingId),
    },
  };
};
