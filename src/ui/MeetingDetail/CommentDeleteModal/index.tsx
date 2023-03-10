import { Text, Highlight, Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

interface CommentDeleteModalProps {
  commentId: number;
  handleDeleteCommentBtnClick: (commentId: number) => void;
}

const CommentDeleteModal = ({
  commentId,
  handleDeleteCommentBtnClick,
}: CommentDeleteModalProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor="white"
        fontSize="sm"
        fontWeight={500}
        color="red.900"
      >
        삭제
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        closeOnOverlayClick={false}
        isCentered={true}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>글 삭제하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="md">
              <Highlight query="삭제" styles={{ color: 'red' }}>
                해당 글을 삭제하시겠습니까?
              </Highlight>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                handleDeleteCommentBtnClick(commentId);
                onClose();
              }}
              bgColor="white"
              color="red.900"
            >
              삭제하기
            </Button>
            <Button variant="ghost" onClick={onClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentDeleteModal;
