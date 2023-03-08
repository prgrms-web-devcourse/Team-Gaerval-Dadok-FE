'use client';

import BottomNavigation from '@/ui/BottomNavigation';
import MeetingPageContainer from '@/ui/Meeting';

import { Flex } from '@chakra-ui/react';

const Meeting = () => {
  return (
    <Flex mt="2rem" direction="column" px="5%" align="center">
      <MeetingPageContainer />
      <BottomNavigation />
    </Flex>
  );
};

export default Meeting;
