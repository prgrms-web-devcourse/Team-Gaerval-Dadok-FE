import {
  Flex,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { useTheme } from '@chakra-ui/react';
import { MutableRefObject, useRef } from 'react';

interface CommentDeleteModalProps {
  commentId: number;
  handleDeleteCommentBtnClick: (commentId: number) => void;
}

const CommentDeleteModal = ({
  commentId,
  handleDeleteCommentBtnClick,
}: CommentDeleteModalProps) => {
  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();

  const cancelRef = useRef(null);

  const onDeleteCommentClick = () => {
    handleDeleteCommentBtnClick(commentId);
    onDeleteModalClose();
  };

  return (
    <>
      <Button
        onClick={onDeleteModalOpen}
        bgColor="white.900"
        fontSize="sm"
        fontWeight={500}
        color="main"
      >
        삭제
      </Button>
      <DeleteComfirmDialog
        cancelRef={cancelRef}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onDelete={onDeleteCommentClick}
      />
    </>
  );
};

export default CommentDeleteModal;

const DeleteComfirmDialog = ({
  cancelRef,
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  cancelRef: MutableRefObject<null>;
}) => {
  const theme = useTheme();

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent alignSelf="center" p="1.5rem">
          <AlertDialogBody fontSize="md" py="1.5rem">
            모임을 정말 삭제할까요?
          </AlertDialogBody>
          <AlertDialogFooter as={Flex} justify="center" gap="1rem">
            <Button
              ref={cancelRef}
              onClick={onClose}
              flexGrow="1"
              {...theme.buttonSizes['md']}
              {...theme.scheme.button['grey']}
            >
              취소
            </Button>
            <Button
              ref={cancelRef}
              onClick={onDelete}
              flexGrow="1"
              {...theme.buttonSizes['md']}
              {...theme.scheme.button['orange-fill']}
            >
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
