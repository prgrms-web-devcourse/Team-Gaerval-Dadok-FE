'use client';
import MeetingDetail from './MeetingDetail';
import ParticipationBtn from './ParticipationBtn';
import CommentInputBox from './CommentInputBox';
import CommentsList from './CommentsList';
import { Flex, Box, Image } from '@chakra-ui/react';

const MeetingDetailPageContainer = () => {
  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <Box>
        <Image src="/icons/goBackIcon.svg" alt="goBackIcon" />
      </Box>
      <MeetingDetail />
      <ParticipationBtn />
      <CommentInputBox />
      <CommentsList />
    </Flex>
  );
};

export default MeetingDetailPageContainer;
