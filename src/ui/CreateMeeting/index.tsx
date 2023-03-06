'use client';

import { Box, Text } from '@chakra-ui/react';

import CreateMeetingForm from './CreateMeetingForm';
import SelectingBook from './SelectingBook';

const CreateMeeting = () => {
  return (
    <Box>
      <Text textAlign="center" fontSize="md" fontWeight={600} m="3rem 0">
        모임 정보를 입력해 주세요
      </Text>
      <SelectingBook />
      <CreateMeetingForm />
    </Box>
  );
};

export default CreateMeeting;
