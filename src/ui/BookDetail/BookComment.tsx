import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Avatar,
  Button,
  Flex,
  Text,
  useDisclosure,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { CSSProperties, MutableRefObject, useRef } from 'react';
import Link from 'next/link';

import { useToast } from '@/hooks/toast';
import type { APIBookComment } from '@/types/book';
import { Menu, MenuItem } from '@/ui/common/Menu';

import CommentDrawer from './CommentDrawer';

interface Props
  extends Pick<
    APIBookComment,
    | 'commentId'
    | 'userId'
    | 'nickname'
    | 'userProfileImage'
    | 'createdAt'
    | 'contents'
  > {
  style?: CSSProperties;
  editable?: boolean;
  onEdit?: (commentId: number, comment: string) => void;
  onDelete?: (commentId: number) => void;
}

const BookComment = ({
  commentId,
  userId,
  nickname,
  userProfileImage,
  createdAt,
  contents,
  editable = false,
  onEdit,
  onDelete,
  style,
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
  const { showToast } = useToast();

  const cancelRef = useRef(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentEdit = () => {
    const comment = textareaRef.current?.value;

    if (!comment) {
      showToast({ message: '코멘트를 입력해주세요!' });
      return;
    }

    onEdit && onEdit(commentId, comment);
    onEditDrawerClose();
  };

  const handleCommentDelete = () => {
    onDelete && onDelete(commentId);
    onDeleteModalClose();
  };

  return (
    <VStack
      width="100%"
      align="flex-start"
      backgroundColor="white.900"
      borderRadius="1rem"
      p="2rem"
      style={style}
    >
      <Flex gap="1rem" align="center" width="100%">
        <Avatar as={Link} href={`/profile/${userId}`} src={userProfileImage} />
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
            <MenuItem text="수정" onClick={onEditDrawerOpen}>
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
            <MenuItem text="삭제" color="red.300" onClick={onDeleteModalOpen}>
              <DeleteComfirmDialog
                cancelRef={cancelRef}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                onDelete={handleCommentDelete}
              />
            </MenuItem>
          </Menu>
        )}
      </Flex>
      <Text
        fontSize="md"
        py="0.5rem"
        textOverflow="ellipsis"
        wordBreak="break-all"
      >
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
