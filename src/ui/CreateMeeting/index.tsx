'use client';
import CreateMeetingForm from './CreateMeetingForm';
import Goback from '../GoBack';
import SelectingBook from './SelectingBook';
import { Box } from '@chakra-ui/react';

const CreateMeeting = () => {
  return (
    <Box>
      <Goback />
      <SelectingBook />
      <CreateMeetingForm />
    </Box>
  );
};

export default CreateMeeting;
