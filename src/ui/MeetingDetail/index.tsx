'use client';
import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import MeetingInfo from '@/ui/MeetingDetail/MeetingInfo';
import CommentInputBox from '@/ui/MeetingDetail/CommentInputBox';
import CommentsList from '@/ui/MeetingDetail/CommentsList';
import useMeetingDetailInfoQuery from '@/queries/meeting/useMeetingDetailInfoQuery';

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

interface MeetingDetailProps {
  bookGroupId: number;
}

interface commentsListDataProps {
  id: number;
  avatarURL: string;
  nickName: string;
  contents: string;
  isWrittenUser: boolean;
}

const MeetingDetail = ({ bookGroupId }: MeetingDetailProps) => {
  const [commentsListData, setCommentsListDate] = useState<
    commentsListDataProps[]
  >([]);

  /* 댓글 리스트 조회 API 연동시, useEffect 삭제 예정 */
  useEffect(() => {
    setCommentsListDate(DUMMY_COMMENTS_LIST_DATA);
  }, []);

  const meetingDetailInfoQuery = useMeetingDetailInfoQuery({ bookGroupId });
  const isSuccess = meetingDetailInfoQuery.isSuccess;
  if (!isSuccess) return null;


  const handleParticipateBtnClick = () => {
    console.log('모임에 참여했습니다.');
    meetingDetailInfoQuery.refetch();
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

  const handleModifyCommentBtnClick = (modifiedComment: string) => {
    console.log('댓글이 수정되었습니다.');
    console.log(modifiedComment);
    /*댓글 수정하기 버튼 클릭시,
      1) 댓글 수정 API 호출
      2) 댓글 리스트 API 호출
      3) commentsListData update*/
  };

  const handleDeleteCommentBtnClick = () => {
    console.log('댓글이 삭제되었습니다.');
    /*댓글 삭제하기 버튼 클릭시,
      1) 댓글 삭제 API 호출
      2) 댓글 리스트 API 호출
      3) commentsListData update*/
  };

  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <MeetingInfo
        meetingInfoData={meetingDetailInfoQuery.data}
        handleParticipateBtnClick={handleParticipateBtnClick}
      />
      <CommentInputBox
        isPartInUser={meetingDetailInfoQuery.data.isGroupMember}
        handleCreateCommentBtnClick={handleCreateCommentBtnClick}
      />
      <CommentsList
        commentsListData={commentsListData}
        handleDeleteCommentBtnClick={handleDeleteCommentBtnClick}
        handleModifyCommentBtnClick={handleModifyCommentBtnClick}
      />
    </Flex>
  );
};

export default MeetingDetail;
