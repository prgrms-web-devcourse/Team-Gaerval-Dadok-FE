import { RefObject } from 'react';
import { Drawer, DrawerContent, Flex, Text, Textarea } from '@chakra-ui/react';

import IconButton from '@/ui/common/IconButton';

interface Props {
  title?: string;
  placeholder?: string;
  defaultComment?: string;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  textareaRef?: RefObject<HTMLTextAreaElement>;
}

const CommentDrawer = ({
  title,
  placeholder,
  defaultComment,
  isOpen,
  onClose,
  onComplete,
  textareaRef,
}: Props) => {
  // TODO : ref로 textarea 포커싱
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" isFullHeight>
      {isOpen && (
        <DrawerContent
          bgColor="white"
          p="2rem"
          margin="0 auto"
          style={{
            position: 'relative',
            maxWidth: '43rem',
          }}
        >
          <Flex align="center" justify="space-between">
            <IconButton
              name="close-legacy"
              size="2rem"
              onClick={onClose}
              alignSelf="flex-start"
            />
            <Text fontSize="md" fontWeight="bold">
              {title}
            </Text>
            <Text
              as="button"
              fontSize="md"
              fontWeight="bold"
              color="main"
              alignSelf="flex-end"
              onClick={onComplete}
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
            placeholder={placeholder}
            defaultValue={defaultComment}
            spellCheck={false}
          />
        </DrawerContent>
      )}
    </Drawer>
  );
};

export default CommentDrawer;
