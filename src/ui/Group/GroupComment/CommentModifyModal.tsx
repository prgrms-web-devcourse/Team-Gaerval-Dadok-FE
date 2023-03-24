import { useRef } from 'react';
import { useDisclosure, Box } from '@chakra-ui/react';

import CommentDrawer from '@/ui/BookDetail/CommentDrawer';

interface CommentModifyModalProps {
  commentId: number;
  comment: string;
  handleModifyCommentBtnClick: (
    modifiedComment: string,
    commentId: number
  ) => void;
}

const CommentModifyModal = ({
  commentId,
  comment,
  handleModifyCommentBtnClick,
}: CommentModifyModalProps) => {
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const {
    onOpen: onModifyModalOpen,
    onClose: onModifyModalClose,
    isOpen: isModifyModalOpen,
  } = useDisclosure();

  const onCompleteClick = () => {
    const comment = commentTextAreaRef.current?.value;
    if (comment) {
      handleModifyCommentBtnClick(comment, commentId);
    }
    onModifyModalClose();
  };

  return (
    <Box>
      <Box
        onClick={onModifyModalOpen}
        w="10rem"
        fontSize="md"
        color="black.800"
      >
        수정
      </Box>
      <CommentDrawer
        title="글 수정하기"
        placeholder="글을 입력해 주세요!"
        isOpen={isModifyModalOpen}
        onClose={onModifyModalClose}
        defaultComment={comment}
        textareaRef={commentTextAreaRef}
        onComplete={onCompleteClick}
      />
    </Box>
  );
};

export default CommentModifyModal;
