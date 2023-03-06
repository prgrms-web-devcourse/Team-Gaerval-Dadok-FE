'use client';

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
import { ReactNode } from 'react';

interface CommentModalProps {
  title: string;
  name: string;
  fontColor: string;
  children: ReactNode;
}

const CommentModal = ({
  children,
  title,
  name,
  fontColor,
}: CommentModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor="white"
        fontSize="sm"
        fontWeight={500}
        color={fontColor}
      >
        {name}
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
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose} bgColor="white" color={fontColor}>
              {name}하기
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

export default CommentModal;
