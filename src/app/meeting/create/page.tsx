'use client';

import MeetingForm from '@/ui/MeetingForm';
import { VStack } from '@chakra-ui/react';
import TopNavigation from '@/ui/common/TopNavigation';
import { useRouter } from 'next/navigation';
import MeetingAPI from '@/apis/Meeting';
import { APICreateMeetingReqeust } from '@/types/meeting';

const CreateMeetingPage = () => {
  const router = useRouter();

  const onSubmit = async (meeting: APICreateMeetingReqeust) => {
    try {
      await MeetingAPI.createMeeting({ meeting });
      router.replace('/meeting');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack justify="center" align="center" pt="2rem" px="2rem">
      <TopNavigation pageTitle="" />
      <MeetingForm onSubmit={onSubmit} />
    </VStack>
  );
};

export default CreateMeetingPage;
