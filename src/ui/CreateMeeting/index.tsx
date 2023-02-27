'use client';
import CreateMeetingForm from './CreateMeetingForm';
import Goback from '../GoBack';
import { Box } from '@chakra-ui/react';

const CreateMeeting = () => {
  return (
    <Box>
      <Goback />
      <CreateMeetingForm />
    </Box>
  );
};

export default CreateMeeting;
