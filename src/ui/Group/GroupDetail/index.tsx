import { Flex, VStack, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import GroupInfo from '@/ui/Group/GroupDetail/GroupInfo';
import CommentInputBox from '../GroupComment/CommentInputBox';
import CommentsList from '../GroupComment';
import useGroupInfoQuery from '@/queries/group/useGroupInfoQuery';
import useGroupCommentsQuery from '@/queries/group/useGroupCommentsQuery';
import GroupAPI from '@/apis/group';
import { useToast } from '@/hooks/toast';
import useAxsioError from '@/hooks/useAxiosError';
import { isDateExpired } from '@/utils/helpers/date';

interface GroupDetailProps {
  bookGroupId: number;
}

const GroupDetail = ({ bookGroupId }: GroupDetailProps) => {
  const groupInfoQuery = useGroupInfoQuery({ bookGroupId });
  const groupCommentsQuery = useGroupCommentsQuery({ bookGroupId });
  const { showToast } = useToast();
  const { handleAxiosError } = useAxsioError();
  const router = useRouter();

  if (groupInfoQuery.isLoading || groupCommentsQuery.isLoading)
    return (
      <VStack gap="2rem" align="stretch" w="100%" mt="2rem">
        <Skeleton height="3rem" />
        <Skeleton height="10rem" />
        <Skeleton height="18rem" />
        <Skeleton height="35rem" />
      </VStack>
    );

  const isSuccess = groupInfoQuery.isSuccess && groupCommentsQuery.isSuccess;
  if (!isSuccess) return null;

  const handleParticipateButtonClick = async (password?: string) => {
    try {
      await GroupAPI.joinGroup({ bookGroupId, password });
      showToast({ message: '모임에 가입되었어요' });
    } catch (error) {
      handleAxiosError(error);
    }

    groupInfoQuery.refetch();
  };

  const handleCreateCommentButtonClick = async (comment: string) => {
    if (comment.trim() === '') return;
    try {
      await GroupAPI.createGroupComment({ bookGroupId, comment });
    } catch (error) {
      console.error(error);
    }
    groupInfoQuery.refetch();
    groupCommentsQuery.refetch();
  };

  const handleModifyCommentButtonClick = async (
    modifiedComment: string,
    commentId: number
  ) => {
    try {
      await GroupAPI.updateGroupComment({
        bookGroupId,
        commentId,
        comment: modifiedComment,
      });
    } catch (error) {
      handleAxiosError(error);
    }
    groupCommentsQuery.refetch();
  };

  const handleDeleteCommentButtonClick = async (commentId: number) => {
    try {
      await GroupAPI.deleteGroupComment({ bookGroupId, commentId });
    } catch (error) {
      handleAxiosError(error);
    }
    groupInfoQuery.refetch();
    groupCommentsQuery.refetch();
  };

  const handleDeleteGroupButtonClick = async () => {
    try {
      await GroupAPI.deleteGroup({ bookGroupId });
    } catch (error) {
      handleAxiosError(error);
    }

    router.push('/group');
  };

  const { isGroupMember, isPublic, endDate } = groupInfoQuery.data;
  const { bookGroupComments, isEmpty } = groupCommentsQuery.data;

  return (
    <Flex direction="column" justify="center">
      <GroupInfo
        groupInfoData={groupInfoQuery.data}
        handleParticipateButtonClick={handleParticipateButtonClick}
        handleDeleteGroupButtonClick={handleDeleteGroupButtonClick}
      />
      {isGroupMember && !isDateExpired(endDate) && (
        <CommentInputBox
          handleCreateCommentButtonClick={handleCreateCommentButtonClick}
        />
      )}
      <CommentsList
        isGroupMember={isGroupMember}
        isPublic={isPublic}
        isEmpty={isEmpty}
        commentsListData={bookGroupComments}
        handleDeleteCommentButtonClick={handleDeleteCommentButtonClick}
        handleModifyCommentButtonClick={handleModifyCommentButtonClick}
      />
    </Flex>
  );
};

export default GroupDetail;
