'use client';
import MeetingDetail from './MeetingDetail';
import ParticipationBtn from './ParticipationBtn';
import CommentInputBox from './CommentInputBox';
import CommentsList from './CommentsList';
import { Flex, Box, Image } from '@chakra-ui/react';

const MeetingDetailPageContainer = () => {
  return (
    <Flex justify="center" mt="1rem">
      <Flex w="90%" direction="column" justify="center">
        <Box className="뒤로 가기 아이콘">
          <Image src="/icons/goBackIcon.svg" alt="goBackIcon" />
        </Box>
        <MeetingDetail />
        <ParticipationBtn />
        <CommentInputBox />
        <CommentsList />
      </Flex>
    </Flex>
  );
};

export default MeetingDetailPageContainer;
