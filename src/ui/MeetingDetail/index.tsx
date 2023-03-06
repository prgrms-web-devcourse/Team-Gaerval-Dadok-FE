'use client';
import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import MeetingInfo from '@/ui/MeetingDetail/MeetingInfo';
import CommentInputBox from '@/ui/MeetingDetail/CommentInputBox';
import CommentsList from '@/ui/MeetingDetail/CommentsList';

const DUMMY_COMMENTS_LIST_DATA = [
  {
    id: 1,
    avatarURL: 'https://bit.ly/dan-abramov',
    nickName: '김규란',
    contents:
      '백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
    isWrittenUser: false,
  },
  {
    id: 2,
    avatarURL: 'https://bit.ly/dan-abramov',
    nickName: '김재현',
    contents:
      '백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
    isWrittenUser: true,
  },
  {
    id: 3,
    avatarURL: 'https://bit.ly/dan-abramov',
    nickName: '백민종',
    contents:
      '백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
    isWrittenUser: false,
  },
  {
    id: 4,
    avatarURL: 'https://bit.ly/dan-abramov',
    nickName: '동해물과',
    contents:
      '백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
    isWrittenUser: false,
  },
];

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
  isPartInUser: true,
};

interface MeetingDetailProps {
  meetingId: string;
}

interface commentsListDataProps {
  id: number;
  avatarURL: string;
  nickName: string;
  contents: string;
  isWrittenUser: boolean;
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
  const [commentsListData, setCommentsListDate] = useState<
    commentsListDataProps[]
  >([]);
  const [meetingInfoData, setMeetingInfoData] = useState<MeetingInfoDataProps>({
    title: '',
    content: '',
    start: '',
    end: '',
    book: '',
    people: '',
    comments: '',
    assession: true,
    members: [],
    isPartInUser: true,
  });

  const handleParticipateBtnClick = () => {
    console.log('모임에 참여했습니다.');
    /*모임 참여 버튼 클릭시, 
      1) 모임 참여 관련 API 호출 예정
      2) 유저의 책장에 책 꽂기 API 호출 예정 
      3) 모임 상세 정보 API 재호출 예정 
      4) meetingInfoData update
      */
  };

  const handleCreateCommentBtnClick = () => {
    console.log('댓글을 생성했습니다.');
    /*댓글 작성하기 버튼 클릭시,
      1) 댓글 생성 API 호출 예정
      2) 댓글 리스트 API 재호출 예정
      3) commentsListData update*/
  };

  useEffect(() => {
    console.log(
      meetingId
    ); /*추후 API 연동하여 모임 상세 정보 및 댓글 리스트를 받아올 예정 */
    setMeetingInfoData(DUMMY_MEETING_DETAIL_INFO_DATA);
    setCommentsListDate(DUMMY_COMMENTS_LIST_DATA);
  }, [meetingId]);

  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <MeetingInfo
        meetingInfoData={meetingInfoData}
        handleParticipateBtnClick={handleParticipateBtnClick}
      />
      <CommentInputBox
        isPartInUser={meetingInfoData.isPartInUser}
        handleCreateCommentBtnClick={handleCreateCommentBtnClick}
      />
      <CommentsList commentsListData={commentsListData} />
    </Flex>
  );
};

export default MeetingDetail;
