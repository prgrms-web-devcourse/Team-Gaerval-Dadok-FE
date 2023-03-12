import { Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

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
  const [modifiedValue, setModeifiedValue] = useState(comment);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModeifiedValue(event.target.value);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor="white"
        fontSize="sm"
        fontWeight={500}
        color="main"
      >
        수정
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
          <ModalHeader>수정하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea value={modifiedValue} h="30rem" onChange={handleChange} />
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                handleModifyCommentBtnClick(modifiedValue, commentId);
                onClose();
              }}
              bgColor="white"
              color="main"
            >
              수정하기
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

export default CommentModifyModal;
