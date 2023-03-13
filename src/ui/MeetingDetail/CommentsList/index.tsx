import {
  Avatar,
  Box,
  Flex,
  Highlight,
  Text,
  VStack,
  Link,
  Image,
} from '@chakra-ui/react';

import Button from '@/ui/common/Button';
import { useAuth } from '@/hooks/auth';
import CommentDeleteModal from '../CommentDeleteModal';
import CommentModifyModal from '../CommentModifyModal';
import { APIBookGroupComments } from '@/types/meetingDetailCommentsList';
import { COMMENTS_DUMMY_DATA } from './commentsDummy';

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
    if (!isAuthed && !isPublic) {
      return COMMENTS_DUMMY_DATA;
    } else if (isAuthed && !isPublic && !isGroupMember) {
      return COMMENTS_DUMMY_DATA;
    }
    return commentsListData;
  };

  const getGuide = () => {
    if (!isAuthed && !isPublic) {
      const kakaoUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;
      return (
        <VStack h="20rem" direction="column" gap="1rem">
          <Text
            w="100%"
            textAlign="center"
            mt="4rem"
            fontSize="lg"
            color="black.700"
          >
            <Highlight query="로그인" styles={{ color: 'main' }}>
              로그인 후 이용해 주세요
            </Highlight>
          </Text>
          <Link href={kakaoUrl} style={{ width: '100%' }}>
            <Button scheme="kakao" fullWidth>
              <Image
                src="/images/kakao.svg"
                alt="카카오 로고"
                width={21}
                height={19}
              />
              카카오 로그인
            </Button>
          </Link>
        </VStack>
      );
    } else if (isAuthed && !isPublic && !isGroupMember) {
      return (
        <Text
          h="10rem"
          w="100%"
          textAlign="center"
          mt="4rem"
          fontSize="lg"
          color="black.700"
        >
          <Highlight query="모임에 참여한 사람" styles={{ color: 'main' }}>
            이 모임은 모임에 참여한 사람만
          </Highlight>
          <br />
          글을 볼 수 있어요
        </Text>
      );
    }
  };

  const filteredComments = getFilteredComments();
  const guide = getGuide();

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
      {guide}
    </Box>
  );
};

export default CommentsList;
