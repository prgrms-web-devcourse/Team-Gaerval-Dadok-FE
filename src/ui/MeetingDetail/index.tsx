'use client';
import MeetingDetail from './MeetingDetail';
import ParticipationBtn from './ParticipationBtn';
import CommentInputBox from './CommentInputBox';
import CommentsList from './CommentsList';
import { Flex, Box, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const MeetingDetailPageContainer = () => {
  /* 테스트용 더미 데이터 입니다 */
  const DummyUserId = 'f';
  const MeetingDetailDummy = {
    start: '2023-03-01',
    end: '2024-02-28',
    bookTitle: '리팩터링 2판 리팩터링 2판 리팩터링 2판 리팩터링 2판',
    people: '1234',
    comments: '2334',
    assession: true,
    members: ['a', 'b', 'c', 'd'],
  };
  const { members } = MeetingDetailDummy;
  /* 테스트용 더미 데이터 입니다 */

  const [joinedMember, setJoinedMember] = useState(false);

  useEffect(() => {
    members.includes(DummyUserId) ? setJoinedMember(true) : '';
  }, [members, DummyUserId]);

  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <Box>
        <Image src="/icons/goBackIcon.svg" alt="goBackIcon" />
      </Box>
      <MeetingDetail />
      <ParticipationBtn joinedMember={joinedMember} />
      <CommentInputBox joinedMember={joinedMember} />
      <CommentsList />
    </Flex>
  );
};

export default MeetingDetailPageContainer;
