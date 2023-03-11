import { useEffect, useRef } from 'react';
import { Flex, Text, Textarea, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import IconButton from '@/ui/common/IconButton';
import { isAxiosError } from 'axios';
import bookAPI from '@/apis/book';

interface Props {
  bookId: number;
  isOpen: boolean;
  onClose: () => void;
}

const CreateCommentDrawer = ({ bookId, isOpen, onClose }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const variants = {
    open: {
      opacity: 1,
      transition: { type: 'tween', duration: 0.1 },
      display: 'flex',
    },
    closed: {
      opacity: 0,
      transition: { type: 'tween', duration: 0.1 },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  /** @todo 추후 메시지 적절한 방법(ex. Toast)으로 띄워주기 */
  const handleCommentCreate = () => {
    const comment = textareaRef.current?.value;

    if (!comment) {
      console.log('입력된 코멘트가 없어요.');
      return;
    }

    bookAPI
      .creaetComment(bookId, { comment })
      .catch(error => {
        if (!isAxiosError(error)) {
          console.error(error);
          return;
        }

        const response = error.response;

        if (response && response.status === 400) {
          console.log('이미 사용자가 작성한 코멘트가 있어요.');
        }
      })
      .finally(onClose);
  };

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <VStack
      as={motion.div}
      initial={'closed'}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      position="absolute"
      align="stretch"
      height="100%"
      left="0"
      bottom="0"
      right="0"
      zIndex="1"
      p="2rem"
      bgColor="white.900"
      width="100%"
      overflow="hidden"
    >
      {isOpen && (
        <>
          <Flex align="center" justify="space-between">
            <IconButton
              name="close"
              size="2rem"
              onClick={onClose}
              alignSelf="flex-start"
            />
            <Text fontSize="md" fontWeight="bold">
              책 코멘트 남기기
            </Text>
            <Text
              as="button"
              fontSize="md"
              fontWeight="bold"
              color="main"
              onClick={handleCommentCreate}
            >
              완료
            </Text>
          </Flex>
          <Textarea
            h="60vh"
            border="none"
            focusBorderColor="white.900"
            resize="none"
            px="0"
            py="4rem"
            ref={textareaRef}
            placeholder="작성해주신 코멘트가 다른 사람들에게 많은 도움이 될 거예요!"
            spellCheck={false}
          />
        </>
      )}
    </VStack>
  );
};

export default CreateCommentDrawer;