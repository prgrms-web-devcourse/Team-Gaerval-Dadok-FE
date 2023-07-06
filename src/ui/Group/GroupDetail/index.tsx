import { Flex, VStack, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import GroupInfo from '@/ui/Group/GroupDetail/GroupInfo';
import CommentInputBox from '../GroupComment/CommentInputBox';
import CommentsList from '../GroupComment';
import useGroupInfoQuery from '@/queries/group/useGroupInfoQuery';
import useGroupCommentsQuery from '@/queries/group/useGroupCommentsQuery';
import GroupAPI from '@/apis/group';
import { useToast } from '@/hooks/toast';

interface GroupDetailProps {
  bookGroupId: number;
}

const GroupDetail = ({ bookGroupId }: GroupDetailProps) => {
  const groupInfoQuery = useGroupInfoQuery({ bookGroupId });
  const groupCommentsQuery = useGroupCommentsQuery({ bookGroupId });
  const { showToast } = useToast();
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

  const handleParticipateBtnClick = async (
    password?: string,
    onSuccess?: () => void
  ) => {
    try {
      await GroupAPI.joinGroup({ bookGroupId, password });
      onSuccess && onSuccess();
      showToast({ message: '모임에 가입되었어요' });
    } catch (error) {
      error &&
        showToast({ message: '정답이 아니에요 다시 한 번 도전해 주세요' });
    }
    groupInfoQuery.refetch();
  };

  const handleCreateCommentBtnClick = async (comment: string) => {
    if (comment.trim() === '') return;
    try {
      await GroupAPI.createGroupComment({ bookGroupId, comment });
    } catch (error) {
      console.error(error);
    }
    groupInfoQuery.refetch();
    groupCommentsQuery.refetch();
  };

  const handleModifyCommentBtnClick = async (
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
      console.error(error);
    }
    groupCommentsQuery.refetch();
  };

  const handleDeleteCommentBtnClick = async (commentId: number) => {
    try {
      await GroupAPI.deleteGroupComment({ bookGroupId, commentId });
    } catch (error) {
      console.error(error);
    }
    groupInfoQuery.refetch();
    groupCommentsQuery.refetch();
  };

  const handleDeleteGroupBtnClick = async () => {
    try {
      await GroupAPI.deleteGroup({ bookGroupId });
    } catch (error) {
      console.error(error);
    }

    router.push('/group');
  };

  const { isGroupMember, isPublic } = groupInfoQuery.data;
  const { bookGroupComments, isEmpty } = groupCommentsQuery.data;

  return (
    <Flex direction="column" justify="center">
      <GroupInfo
        groupInfoData={groupInfoQuery.data}
        handleParticipateBtnClick={handleParticipateBtnClick}
        handleDeleteGroupBtnClick={handleDeleteGroupBtnClick}
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
