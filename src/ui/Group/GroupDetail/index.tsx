import { Flex, VStack, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import GroupInfo from '@/ui/Group/GroupDetail/GroupInfo';
import CommentInputBox from '../GroupComment/CommentInputBox';
import CommentsList from '../GroupComment/CommentsList';
import useMeetingInfoQuery from '@/queries/meeting/useMeetingInfoQuery';
import useMeetingCommentsQuery from '@/queries/meeting/useMeetingCommentsQuery';
import MeetingAPI from '@/apis/meeting';
import { useToast } from '@/hooks/toast';

interface GroupDetailProps {
  bookGroupId: number;
}

const GroupDetail = ({ bookGroupId }: GroupDetailProps) => {
  const meetingInfoQuery = useMeetingInfoQuery({ bookGroupId });
  const meetingCommentsQuery = useMeetingCommentsQuery({ bookGroupId });
  const { showToast } = useToast();
  const router = useRouter();

  if (meetingInfoQuery.isLoading || meetingCommentsQuery.isLoading)
    return (
      <VStack gap="2rem" align="stretch" w="100%" mt="2rem">
        <Skeleton height="3rem" />
        <Skeleton height="10rem" />
        <Skeleton height="18rem" />
        <Skeleton height="35rem" />
      </VStack>
    );

  const isSuccess =
    meetingInfoQuery.isSuccess && meetingCommentsQuery.isSuccess;
  if (!isSuccess) return null;

  const handleParticipateBtnClick = async (
    password?: string,
    onSuccess?: () => void
  ) => {
    try {
      await MeetingAPI.postMeetingJoin({ bookGroupId, password });
      onSuccess && onSuccess();
      showToast({ message: '모임에 가입되었어요' });
    } catch (error) {
      error &&
        showToast({ message: '정답이 아니에요 다시 한 번 도전해 주세요' });
    }
    meetingInfoQuery.refetch();
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

  const handleModifyCommentBtnClick = async (
    modifiedComment: string,
    commentId: number
  ) => {
    try {
      await MeetingAPI.patchMeetingComment({
        bookGroupId,
        commentId,
        comment: modifiedComment,
      });
    } catch (error) {
      console.error(error);
    }
    meetingCommentsQuery.refetch();
  };

  const handleDeleteCommentBtnClick = async (commentId: number) => {
    try {
      await MeetingAPI.deleteComment({ bookGroupId, commentId });
    } catch (error) {
      console.error(error);
    }
    meetingInfoQuery.refetch();
    meetingCommentsQuery.refetch();
  };

  const handleDeleteMeetingBtnClick = async () => {
    try {
      await MeetingAPI.deleteMeeting({ bookGroupId });
    } catch (error) {
      console.error(error);
    }

    router.push('/group');
  };

  const { isGroupMember, isPublic } = meetingInfoQuery.data;
  const { bookGroupComments, isEmpty } = meetingCommentsQuery.data;

  return (
    <Flex direction="column" justify="center">
      <GroupInfo
        meetingInfoData={meetingInfoQuery.data}
        handleParticipateBtnClick={handleParticipateBtnClick}
        handleDeleteMeetingBtnClick={handleDeleteMeetingBtnClick}
      />
      <CommentInputBox
        isPartInUser={isGroupMember}
        handleCreateCommentBtnClick={handleCreateCommentBtnClick}
      />
      <CommentsList
        isGroupMember={isGroupMember}
        isPublic={isPublic}
        isEmpty={isEmpty}
        commentsListData={bookGroupComments}
        handleDeleteCommentBtnClick={handleDeleteCommentBtnClick}
        handleModifyCommentBtnClick={handleModifyCommentBtnClick}
      />
    </Flex>
  );
};

export default GroupDetail;
