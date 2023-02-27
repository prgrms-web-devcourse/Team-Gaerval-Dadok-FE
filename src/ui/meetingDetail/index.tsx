'use client';
import MeetingDetail from './MeetingDetail';
import ParticipationBtn from './ParticipationBtn';
import CommentInputBox from './CommentInputBox';
import CommentsList from './CommentsList';
import { Flex } from '@chakra-ui/react';
import Goback from '../GoBack';

const MeetingDetailPageContainer = () => {
  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <Goback />
      <MeetingDetail />
      <ParticipationBtn />
      <CommentInputBox />
      <CommentsList />
    </Flex>
  );
};

export default MeetingDetailPageContainer;
