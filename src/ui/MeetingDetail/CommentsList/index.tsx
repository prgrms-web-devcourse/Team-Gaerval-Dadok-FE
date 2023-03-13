import { Avatar, Box, Flex, Highlight, Text } from '@chakra-ui/react';

import { useAuth } from '@/hooks/auth';
import CommentDeleteModal from '../CommentDeleteModal';
import CommentModifyModal from '../CommentModifyModal';
import { APIBookGroupComments } from '@/types/meetingDetailCommentsList';
import { initialBookGroupComments } from '@/constants/initialBookGroupComments';
import GuideMessage from './GuideMessage';

interface commentsListProps {
  isGroupMember: boolean;
  isPublic: boolean;
  isEmpty: boolean;
  commentsListData: APIBookGroupComments[];
  handleDeleteCommentBtnClick: (commentId: number) => void;
  handleModifyCommentBtnClick: (
    modifiedComment: string,
    commentId: number
  ) => void;
}

const CommentsList = ({
  isGroupMember,
  isPublic,
  isEmpty,
  commentsListData,
  handleDeleteCommentBtnClick,
  handleModifyCommentBtnClick,
}: commentsListProps) => {
  const { isAuthed } = useAuth();

  const getFilteredComments = () => {
    console.log(isPublic);
    console.log(commentsListData);
    const commentsLength = commentsListData.length;

    if (!isAuthed && !isPublic && commentsLength < 5) {
      console.log('slice');
      return initialBookGroupComments.slice(0, commentsLength);
    } else if (!isAuthed && !isPublic) {
      return initialBookGroupComments;
    }

    if (isAuthed && !isPublic && !isGroupMember && commentsLength < 5) {
      return initialBookGroupComments.slice(0, commentsLength);
    } else if (isAuthed && !isPublic && !isGroupMember) {
      return initialBookGroupComments;
    }
    return commentsListData;
  };

  const filteredComments = getFilteredComments();

  return isEmpty ? (
    <Text w="100%" textAlign="center" mt="4rem" fontSize="lg" color="black.700">
      <Highlight query="주인공" styles={{ color: 'main' }}>
        첫 번째 글 작성의 주인공이 되어주세요.
      </Highlight>
    </Text>
  ) : (
    <Box mt="1.5rem">
      <Box fontSize="lg" fontWeight={700}>
        댓글
      </Box>
      <Box>
        {filteredComments &&
          filteredComments.map(
            ({
              commentId,
              contents,
              userProfileImage,
              nickname,
              writtenByCurrentUser,
            }) => {
              return (
                <Box
                  filter="auto"
                  blur={
                    (!isAuthed && !isPublic) ||
                    (isAuthed && !isPublic && !isGroupMember)
                      ? '3px'
                      : ''
                  }
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
                        fontWeight={500}
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
      <GuideMessage
        isAuthed={isAuthed}
        isPublic={isPublic}
        isGroupMember={isGroupMember}
      />
    </Box>
  );
};

export default CommentsList;
