import { CSSProperties, MutableRefObject, useRef } from 'react';
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
import CommentDrawer from './CommentDrawer';

import type { APIBookComment } from '@/types/book';

interface Props
  extends Pick<
    APIBookComment,
    'commentId' | 'nickname' | 'userProfileImage' | 'createdAt' | 'contents'
  > {
  style?: CSSProperties;
  editable?: boolean;
  onEdit?: (commentId: number, comment: string) => void;
  onDelete?: () => void;
}

const BookComment = ({
  commentId,
  nickname,
  userProfileImage,
  createdAt,
  contents,
  editable = false,
  onEdit,
  onDelete,
  ...props
}: Props) => {
  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();
  const {
    isOpen: isEditDrawerOpen,
    onClose: onEditDrawerClose,
    onOpen: onEditDrawerOpen,
  } = useDisclosure();

  const cancelRef = useRef(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentEdit = () => {
    const comment = textareaRef.current?.value;

    if (!comment) {
      console.log('입력된 코멘트가 없어요.');
      return;
    }

    onEdit && onEdit(commentId, comment);
    onEditDrawerClose();
  };

  const handleCommentDelete = () => {
    /** @todo 삭제 api 연결 */
    onDelete && onDelete();
    onDeleteModalClose();
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
              <MenuItem onClick={onEditDrawerOpen}>
                수정
                <CommentDrawer
                  title="책 코멘트 수정하기"
                  placeholder="더 멋진 코멘트를 작성해주세요!"
                  defaultComment={contents}
                  isOpen={isEditDrawerOpen}
                  onClose={onEditDrawerClose}
                  onComplete={handleCommentEdit}
                  textareaRef={textareaRef}
                />
              </MenuItem>
              <MenuItem color="red.300" onClick={onDeleteModalOpen}>
                삭제
                <DeleteComfirmDialog
                  cancelRef={cancelRef}
                  isOpen={isDeleteModalOpen}
                  onClose={onDeleteModalClose}
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
