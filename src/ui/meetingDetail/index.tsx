'use client';
import ViewMeetingDetail from './ViewMeetingDetail';
import ParticipationBtn from './ParticipationBtn';
import CommentInputBox from './CommentInputBox';
import CommentsList from './CommentsList';
import { Flex } from '@chakra-ui/react';
import Goback from '../GoBack';

const MeetingDetailPageContainer = () => {
  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <Goback />
      <ViewMeetingDetail />
      <ParticipationBtn />
      <CommentInputBox />
      <CommentsList />
    </Flex>
  );
};

export default MeetingDetailPageContainer;
