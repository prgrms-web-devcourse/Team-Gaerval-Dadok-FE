'use client';

import MeetingAPI from '@/apis/Meeting';
import { APIMeetingDetail } from '@/types/meetingDetail';
import TopNavigation from '@/ui/common/TopNavigation';
import { EditMeetingForm } from '@/ui/MeetingForm';
import { VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

const MeetingEditPage = ({ params: { id } }: { params: { id: number } }) => {
  const [meeting, setMeeting] = useState<APIMeetingDetail>();

  const getMeeting = useCallback(async () => {
    try {
      const { data } = await MeetingAPI.getMeetingDetailInfo({
        bookGroupId: id,
      });
      setMeeting(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

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
