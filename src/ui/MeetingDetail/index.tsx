'use client';
import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import MeetingInfo from '@/ui/MeetingDetail/MeetingInfo';
import CommentInputBox from '@/ui/MeetingDetail/CommentInputBox';
import CommentsList from '@/ui/MeetingDetail/CommentsList';

const DUMMY_MEETING_DETAIL_INFO_DATA = {
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
  isPartInUser: false,
};

interface MeetingDetailProps {
  meetingId: string;
}

interface MeetingInfoDataProps {
  title: string;
  content: string;
  start: string;
  end: string;
  book: string;
  people: string;
  comments: string;
  assession: boolean;
  members: string[];
  isPartInUser: boolean;
}

const MeetingDetail = ({ meetingId }: MeetingDetailProps) => {
  const [MeetingInfoData, setMeetingInfoData] = useState<MeetingInfoDataProps>({
    title: '',
    content: '',
    start: '',
    end: '',
    book: '',
    people: '',
    comments: '',
    assession: true,
    members: [],
    isPartInUser: false,
  });

  useEffect(() => {
    console.log(meetingId); /*추후 API 연동하여 모임 상세 정보를 받아올 예정 */
    setMeetingInfoData(DUMMY_MEETING_DETAIL_INFO_DATA);
  }, [meetingId]);

  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <MeetingInfo meetingInfoData={MeetingInfoData} />
      <CommentInputBox isPartInUser={MeetingInfoData.isPartInUser} />
      <CommentsList />
    </Flex>
  );
};

export default MeetingDetail;
