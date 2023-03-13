import { AddMeetingForm } from '@/ui/MeetingForm';
import { VStack } from '@chakra-ui/react';
import TopNavigation from '@/ui/common/TopNavigation';
import AuthRequired from '@/ui/AuthRequired';

const CreateMeetingPage = () => {
  return (
    <AuthRequired>
      <VStack justify="center" align="center">
        <TopNavigation pageTitle="모임 생성" />
        <AddMeetingForm />
      </VStack>
    </AuthRequired>
  );
};

export default CreateMeetingPage;
