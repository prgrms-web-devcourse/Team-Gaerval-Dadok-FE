'use client';

import { AddMeetingForm } from '@/ui/MeetingForm';
import { VStack } from '@chakra-ui/react';
import TopNavigation from '@/ui/common/TopNavigation';

const CreateMeetingPage = () => {
  return (
    <VStack justify="center" align="center" pt="2rem" px="2rem">
      <TopNavigation pageTitle="" />
      <AddMeetingForm />
    </VStack>
  );
};

export default CreateMeetingPage;
