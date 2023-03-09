import { useEffect, useRef } from 'react';
import { Flex, Text, Textarea, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import IconButton from '@/ui/common/IconButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCommentDrawer = ({ isOpen, onClose }: Props) => {
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentSubmit = () => {
    /** @todo 책 코멘트 생성 api 연결 */
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
    console.log(isOpen);
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
              onClick={handleCommentSubmit}
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
