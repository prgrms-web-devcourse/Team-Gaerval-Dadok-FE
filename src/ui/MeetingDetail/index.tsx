'use client';
import ViewMeetingDetail from './ViewMeetingDetail';
import ParticipationBtn from './ParticipationBtn';
import CommentInputBox from './CommentInputBox';
import CommentsList from './CommentsList';
import { Flex } from '@chakra-ui/react';
import Goback from '../GoBack';

const MeetingDetailPageContainer = () => {
  return (
    <>
      <Goback />
      <Flex px="2rem" direction="column" justify="center">
        <ViewMeetingDetail />
        <ParticipationBtn />
        <CommentInputBox />
        <CommentsList />
      </Flex>
    </>
  );
};

export default MeetingDetailPageContainer;
