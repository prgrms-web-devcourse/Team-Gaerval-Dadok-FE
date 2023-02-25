'use client';
import MeetingDetail from './meetingDetail';
import ParticipationBtn from './participationBtn';
import { Flex, Box, Image } from '@chakra-ui/react';
import CommentInputBox from './commentInputBox';
import CommentsList from './commentsList';

const MeetingDetailPageComponents = () => {
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

export default MeetingDetailPageComponents;
