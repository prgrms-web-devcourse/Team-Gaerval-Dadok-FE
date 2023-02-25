'use client';
import { Flex } from '@chakra-ui/react';
import MeetingList from './MeetingList';
import MeetingListHeader from './MeetingListHeader';

const MeetingPageContainer = () => {
  return (
    <Flex justify="center">
      <Flex mt="2rem" w="90%" direction="column">
        <MeetingListHeader />
        <MeetingList />
      </Flex>
    </Flex>
  );
};

export default MeetingPageContainer;
