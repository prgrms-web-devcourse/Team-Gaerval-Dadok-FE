import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import CommentDeleteModal from '../CommentDeleteModal';
import CommentModifyModal from '../CommentModifyModal';
import { APIBookGroupComments } from '@/types/meetingDetailCommentsList';

interface commentsListProps {
  isEmpty: boolean;
  commentsListData: APIBookGroupComments[];
  handleDeleteCommentBtnClick: (commentId: number) => void;
  handleModifyCommentBtnClick: (
    modifiedComment: string,
    commentId: number
  ) => void;
}

const CommentsList = ({
  isEmpty,
  commentsListData,
  handleDeleteCommentBtnClick,
  handleModifyCommentBtnClick,
}: commentsListProps) => {
  return isEmpty ? (
    <Text w="100%" textAlign="center" mt="4rem" fontSize="lg" color="black.700">
      첫 번째 글 작성의 주인공이 되어주세요.
    </Text>
  ) : (
    <Box mt="1.5rem">
      <Box fontSize="lg" fontWeight={700}>
        댓글
      </Box>
      <Box>
        {commentsListData.map(
          ({
            commentId,
            contents,
            bookGroupId: _bookGroupId,
            parentCommentId: _parentCommentId,
            userId: _userId,
            userProfileImage,
            createdAt: _createdAt,
            modifiedAt: _modifiedAt,
            nickname,
            writtenByCurrentUser,
          }) => {
            return (
              <Box
                key={commentId}
                mt="1rem"
                p="1rem"
                bgColor="white"
                borderRadius="1.5rem"
                boxShadow="default"
              >
                <Flex mb="0.5rem" justify="space-between">
                  <Flex>
                    <Avatar src={userProfileImage} loading="lazy" />
                    <Flex
                      align="center"
                      fontSize="sm"
                      ml="1rem"
                      fontWeight={600}
                    >
                      {nickname}
                    </Flex>
                  </Flex>
                  <Flex align="center" pt="0.4rem">
                    {writtenByCurrentUser ? (
                      <>
                        <CommentModifyModal
                          commentId={commentId}
                          comment={contents}
                          handleModifyCommentBtnClick={
                            handleModifyCommentBtnClick
                          }
                        />
                        <CommentDeleteModal
                          commentId={commentId}
                          handleDeleteCommentBtnClick={
                            handleDeleteCommentBtnClick
                          }
                        />
                      </>
                    ) : (
                      ''
                    )}
                  </Flex>
                </Flex>
                <Box lineHeight="2.2rem" fontSize="md">
                  {contents}
                </Box>
              </Box>
            );
          }
        )}
      </Box>
    </Box>
  );
};

export default CommentsList;
