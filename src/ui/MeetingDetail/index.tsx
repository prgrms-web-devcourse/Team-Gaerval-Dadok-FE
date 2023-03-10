'use client';

import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import MeetingInfo from '@/ui/MeetingDetail/MeetingInfo';
import CommentInputBox from '@/ui/MeetingDetail/CommentInputBox';
import CommentsList from '@/ui/MeetingDetail/CommentsList';
import useMeetingInfoQuery from '@/queries/meeting/useMeetingInfoQuery';
import useMeetingCommentsQuery from '@/queries/meeting/useMeetingCommentsQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import MeetingAPI from '@/apis/Meeting';

interface MeetingDetailProps {
  bookGroupId: number;
}

const MeetingDetail = ({ bookGroupId }: MeetingDetailProps) => {
  const meetingInfoQuery = useMeetingInfoQuery({ bookGroupId });
  const meetingCommentsQuery = useMeetingCommentsQuery({ bookGroupId });
  const userProfile = useMyProfileQuery();
  const router = useRouter();

  const isSuccess =
    meetingInfoQuery.isSuccess &&
    meetingCommentsQuery.isSuccess &&
    userProfile.isSuccess;
  if (!isSuccess) return null;

  const userNickname = userProfile.data.nickname;
  const userAvatar = userProfile.data.profileImage;

  const handleParticipateBtnClick = async () => {
    try {
      await MeetingAPI.postMeetingJoin({ bookGroupId });
    } catch (error) {
      console.error(error);
    }
    meetingInfoQuery.refetch();
    /*모임 참여 버튼 클릭시, 
      TODO
      2) 유저의 책장에 책 꽂기 API 호출 예정 
      */
  };

  const handleCreateCommentBtnClick = async (comment: string) => {
    if (comment.trim() === '') return;
    try {
      await MeetingAPI.createMeetingComment({ bookGroupId, comment });
    } catch (error) {
      console.error(error);
    }
    meetingInfoQuery.refetch();
    meetingCommentsQuery.refetch();
  };

  const handleModifyCommentBtnClick = (modifiedComment: string) => {
    console.log('댓글이 수정되었습니다.');
    console.log(modifiedComment);
    /*댓글 수정하기 버튼 클릭시,
      1) 댓글 수정 API 호출
      2) 댓글 리스트 API 호출
      3) commentsListData update*/
  };

  const handleDeleteCommentBtnClick = async (commentId: number) => {
    console.log('commentId >>>>>>', commentId);
    try {
      await MeetingAPI.deleteComment({ bookGroupId, commentId });
    } catch (error) {
      console.error(error);
    }
    meetingCommentsQuery.refetch();
    /*댓글 삭제하기 버튼 클릭시*/
  };

  const handleDeleteMeetingBtnClick = async () => {
    try {
      await MeetingAPI.deleteMeeting({ bookGroupId });
    } catch (error) {
      console.error(error);
    }

    router.push('/meeting');
  };

  const { isGroupMember } = meetingInfoQuery.data;
  const { bookGroupComments, isEmpty } = meetingCommentsQuery.data;

  return (
    <Flex direction="column" justify="center">
      <MeetingInfo
        meetingInfoData={meetingInfoQuery.data}
        handleParticipateBtnClick={handleParticipateBtnClick}
        handleDeleteMeetingBtnClick={handleDeleteMeetingBtnClick}
      />
      <CommentInputBox
        userNickname={userNickname}
        userAvatar={userAvatar}
        isPartInUser={isGroupMember}
        handleCreateCommentBtnClick={handleCreateCommentBtnClick}
      />
      <CommentsList
        isEmpty={isEmpty}
        commentsListData={bookGroupComments}
        handleDeleteCommentBtnClick={handleDeleteCommentBtnClick}
        handleModifyCommentBtnClick={handleModifyCommentBtnClick}
      />
    </Flex>
  );
};

export default MeetingDetail;
