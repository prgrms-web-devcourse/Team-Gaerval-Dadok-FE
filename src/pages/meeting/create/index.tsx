import { AddMeetingForm } from '@/ui/MeetingForm';
import { VStack } from '@chakra-ui/react';
import TopNavigation from '@/ui/common/TopNavigation';

const CreateMeetingPage = () => {
  return (
    <VStack justify="center" align="center">
      <TopNavigation pageTitle="모임 생성" />
      <AddMeetingForm />
    </VStack>
  );
};

export default CreateMeetingPage;
