'use client';

import { Box } from '@chakra-ui/react';

import CreateMeetingForm from './CreateMeetingForm';
import SelectingBook from './SelectingBook';

const CreateMeeting = () => {
  return (
    <Box>
      <SelectingBook />
      <CreateMeetingForm />
    </Box>
  );
};

export default CreateMeeting;
