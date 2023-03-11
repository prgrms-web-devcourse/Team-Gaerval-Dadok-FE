import {
  Avatar,
  Flex,
  VStack,
  Text,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  useDisclosure,
  AlertDialogFooter,
  AlertDialogContent,
  useTheme,
} from '@chakra-ui/react';

import MoreIcon from '@public/icons/more.svg';
import { CSSProperties, MutableRefObject, useRef } from 'react';

import type { APIBookComment } from '@/types/book';

interface Props
  extends Pick<
    APIBookComment,
    'nickname' | 'userProfileImage' | 'createdAt' | 'contents'
  > {
  style?: CSSProperties;
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BookComment = ({
  nickname,
  userProfileImage,
  createdAt,
  contents,
  editable = false,
  onDelete,
  ...props
}: Props) => {
  const cancelRef = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleCommentDelete = () => {
    /** @todo 삭제 api 연결 */
    onDelete && onDelete();
    onClose();
  };

  return (
    <VStack
      width="100%"
      align="flex-start"
      backgroundColor="white.900"
      borderRadius="1rem"
      p="2rem"
      {...props}
    >
      <Flex gap="1rem" align="center" width="100%">
        <Avatar src={userProfileImage} />
        <VStack flexGrow="1" align="flex-start">
          <Text fontSize="sm" fontWeight="bold">
            {nickname}
          </Text>
          <Text fontSize="xs" style={{ margin: 0 }} color="black.500">
            {createdAt}
          </Text>
        </VStack>
        {editable && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<MoreIcon />}
              background="inherit"
              border="none"
            />
            <MenuList fontSize="md">
              <MenuItem>수정</MenuItem>
              <MenuItem color="red.300" onClick={onOpen}>
                삭제
                <DeleteComfirmDialog
                  cancelRef={cancelRef}
                  isOpen={isOpen}
                  onClose={onClose}
                  onDelete={handleCommentDelete}
                />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Text fontSize="md" py="0.5rem">
        {contents}
      </Text>
    </VStack>
  );
};

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
            코멘트를 정말 삭제할까요?
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

export default BookComment;
