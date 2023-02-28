'use client';
import { Flex } from '@chakra-ui/react';
import MeetingList from './MeetingList';
import MeetingListHeader from './MeetingListHeader';

const MeetingPageContainer = () => {
  return (
    <Flex mt="2rem" direction="column" px="5%">
      <MeetingListHeader />
      <MeetingList />
    </Flex>
  );
};

export default MeetingPageContainer;
