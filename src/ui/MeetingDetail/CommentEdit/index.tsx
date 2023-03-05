'use client';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import CommentDelete from './CommentDelete';
import CommentFix from './CommentModify';

interface CommentEditProps {
  title: string;
  name: string;
  fontColor: string;
  content?: string | undefined;
}

const CommentEdit = ({ name, fontColor, title, content }: CommentEditProps) => {
  const [modifyValue, setModifyValue] = useState(`${content}`);
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(modifyValue);

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
          <ModalBody>
            {name === '삭제' ? (
              <CommentDelete />
            ) : (
              <CommentFix
                modifyValue={modifyValue}
                setModifyValue={setModifyValue}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} bgColor={fontColor} color="white">
              {name}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              나가기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentEdit;
