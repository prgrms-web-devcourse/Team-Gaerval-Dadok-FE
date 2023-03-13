import { Box, Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import CommentDrawer from '@/ui/BookDetail/CommentDrawer';
import { useDisclosure } from '@chakra-ui/react';
interface CommentInputBoxProps {
  isPartInUser: boolean;
  handleCreateCommentBtnClick: (comment: string) => void;
  userNickname?: string | null;
  userAvatar?: string;
}

const CommentInputBox = ({
  isPartInUser,
  handleCreateCommentBtnClick,
}: CommentInputBoxProps) => {
  const {
    isOpen: isCommentDrawer,
    onOpen: onCommentDrawerOpen,
    onClose: onCommentDrawerClose,
  } = useDisclosure();
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const onCompleteClick = () => {
    const comment = commentTextAreaRef.current?.value;
    if (comment) {
      handleCreateCommentBtnClick(comment);
    }
    onCommentDrawerClose();
  };

  return (
    <Box mt="1.5rem" h="100%">
      <Box fontSize="lg" fontWeight={700} mb="1rem">
        댓글 작성
      </Box>
      <Box p="1rem" bgColor="white" borderRadius="1rem" boxShadow="default">
        <Box m="1rem 0">
          <Flex
            pl="1rem"
            align="center"
            w="100%"
            h="4rem"
            fontSize="md"
            color="black.600"
            border="solid 1px"
            borderColor={!isPartInUser ? 'white.900' : 'main'}
            backgroundColor={!isPartInUser ? 'white.700' : 'white.900'}
            borderRadius="1rem"
            onClick={() => {
              if (isPartInUser) {
                onCommentDrawerOpen();
              }
            }}
          >
            {isPartInUser
              ? '댓글을 입력해 주세요'
              : '모임에 참여해야 글을 작성할 수 있습니다'}
          </Flex>
        </Box>
      </Box>
      <CommentDrawer
        title="글 작성하기"
        placeholder="여러분의 자유로운 이야기를 들려주세요"
        isOpen={isCommentDrawer}
        onClose={onCommentDrawerClose}
        textareaRef={commentTextAreaRef}
        onComplete={onCompleteClick}
      />
    </Box>
  );
};

export default CommentInputBox;
