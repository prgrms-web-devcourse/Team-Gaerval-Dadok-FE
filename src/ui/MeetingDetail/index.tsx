'use client';
import MeetingDetail from './MeetingDetail';
import ParticipationBtn from './ParticipationBtn';
import CommentInputBox from './CommentInputBox';
import CommentsList from './CommentsList';
import { Flex, Box, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface MeetingDetailPageContainerProps {
  meetingId: string;
}

const MeetingDetailPageContainer = ({
  meetingId,
}: MeetingDetailPageContainerProps) => {
  const DummyUserId = 'f'; /* 테스트용 더미 데이터 입니다 */
  const MeetingDetailDummy = {
    title: '개발자들 모여라!!',
    content:
      '아키텍처를 잘 모르는 개발자라면, 이 책을 읽으며 개발 업무의 구조를 이해하는 실력을 향상할 수 있다. 현업 아키텍트라면, 결정사항을 잘 설명하여 팀을 이끌고 이해관계자와 소통하는 능력을 키울 것이다. 이 책과 함께 프로젝트와 팀을 성공으로 이끄는 훌륭한 아키텍트로 거듭나길 바란다. 이 책과 관련된 여러분의 생각을 적어주세요!!',
    start: '2023-03-01',
    end: '2024-02-28',
    book: '개발자에서 아키텍트로',
    people: '1234',
    comments: '2334',
    assession: true,
    members: ['a', 'b', 'c', 'd'],
  };
  const { members } = MeetingDetailDummy; /* 테스트용 더미 데이터 입니다 */

  console.log(meetingId); /*추후 API 연동하여 모임 상세 정보를 받아올 예정 */

  const [joinedMember, setJoinedMember] = useState(false);

  useEffect(() => {
    members.includes(DummyUserId) ? setJoinedMember(true) : '';
  }, [members, DummyUserId]);

  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <Box>
        <Image src="/icons/goBackIcon.svg" alt="goBackIcon" />
      </Box>
      <MeetingDetail
        joinedMember={joinedMember}
        MeetingDetailDummy={MeetingDetailDummy}
      />
      <ParticipationBtn
        joinedMember={joinedMember}
        setJoinedMember={setJoinedMember}
      />
      <CommentInputBox joinedMember={joinedMember} />
      <CommentsList />
    </Flex>
  );
};

export default MeetingDetailPageContainer;
