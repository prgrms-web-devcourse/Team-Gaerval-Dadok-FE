'use client';

import { AddMeetingForm } from '@/ui/MeetingForm';
import { VStack } from '@chakra-ui/react';
import TopNavigation from '@/ui/common/TopNavigation';

const CreateMeetingPage = () => {
  return (
    <VStack justify="center" align="center">
      <TopNavigation pageTitle="" />
      <AddMeetingForm />
    </VStack>
  );
};

export default CreateMeetingPage;
