import { Avatar, Box, Flex } from '@chakra-ui/react';

import CommentDeleteModal from '../CommentDeleteModal';
import CommentModifyModal from '../CommentModifyModal';
import { APIBookGroupComments } from '@/types/meetingDetailCommentsList';

interface commentsListProps {
  commentsListData: APIBookGroupComments[];
  handleDeleteCommentBtnClick: () => void;
  handleModifyCommentBtnClick: (modifiedComment: string) => void;
}

const CommentsList = ({
  commentsListData,
  handleDeleteCommentBtnClick,
  handleModifyCommentBtnClick,
}: commentsListProps) => {
  const isWrittenUser = true;

  return (
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
            userId,
            userProfileImage,
            createdAt: _createdAt,
            modifiedAt: _modifiedAt,
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
                      {userId}
                    </Flex>
                  </Flex>
                  <Flex align="center" pt="0.4rem">
                    {isWrittenUser ? (
                      <>
                        <CommentModifyModal
                          comment={contents}
                          handleModifyCommentBtnClick={
                            handleModifyCommentBtnClick
                          }
                        />
                        <CommentDeleteModal
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
