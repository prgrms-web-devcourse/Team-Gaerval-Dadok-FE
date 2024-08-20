import { useMemo } from 'react';

import type { Writer } from '@/types/user';
import useDisclosure from '@/hooks/useDisclosure';

import Avatar from '@/v1/base/Avatar';
import Menu from '@/v1/base/Menu';
import Button from '@/v1/base/Button';
import Drawer from '@/v1/base/Drawer';
import Modal from '@/v1/base/Modal';

type Comment = {
  id: number;
  writer: Writer;
  createdAt: string;
  content: string;
};

interface CommentListProps {
  comments: Comment[];
  name?: string;
  isHidden?: boolean;
  hiddenText?: string;
  emptyText?: string;
  isEditableComment?: (comment: Comment) => boolean;
  onEditConfirm?: (commentId: Comment['id']) => void;
  onDeleteConfirm?: (commentId: Comment['id']) => void;
}

const CommentList = ({
  name = '코멘트',
  comments,
  isHidden,
  hiddenText,
  emptyText,
  isEditableComment,
  onEditConfirm,
  onDeleteConfirm,
}: CommentListProps) => {
  const titleOnCommentEdit = useMemo(
    () => [name, '수정하기'].join(' '),
    [name]
  );

  if (isHidden) {
    return <p className="py-[2rem] text-center text-sm">{hiddenText}</p>;
  }

  if (comments.length === 0) {
    return (
      <p className="self-center whitespace-pre-line py-[2rem] text-center text-sm">
        {emptyText}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-[1rem]">
      {comments.map(comment => {
        const { id, writer, createdAt, content } = comment;
        return (
          <li className="flex flex-col gap-[1rem] py-[1rem]" key={id}>
            <div className="flex gap-[1rem]">
              <Avatar
                src={writer.profileImageSrc}
                name={writer.name}
                size="medium"
              />
              <div className="flex flex-grow flex-col">
                <Name name={writer.name} />
                <Date date={createdAt} />
              </div>
              {isEditableComment && isEditableComment(comment) && (
                <CommentActionMenu
                  comment={comment}
                  titleOnCommentEdit={titleOnCommentEdit}
                  onEditConfirm={onEditConfirm}
                  onDeleteConfirm={onDeleteConfirm}
                />
              )}
            </div>
            <CommentContent content={content} />
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;

const Name = ({ name }: { name: string }) => (
  <p className="text-sm font-bold">{name}</p>
);

const Date = ({ date }: { date: string }) => (
  <p className="text-xs text-placeholder">{date}</p>
);

const CommentContent = ({ content }: { content: string }) => (
  <p className="text-justify text-md">{content}</p>
);

const CommentActionMenu = ({
  comment,
  titleOnCommentEdit,
  onEditConfirm,
  onDeleteConfirm,
}: {
  comment: Comment;
  titleOnCommentEdit?: string;
  onEditConfirm?: (commentId: Comment['id']) => void;
  onDeleteConfirm?: (commentId: Comment['id']) => void;
}) => {
  const { id: commentId, content } = comment;

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const handleChangeConfirm = () => {
    onEditConfirm && onEditConfirm(commentId);
  };

  const handleDeleteConfirm = () => {
    onDeleteConfirm && onDeleteConfirm(commentId);
  };

  return (
    <>
      <Menu>
        <Menu.Toggle />
        <Menu.DropdownList>
          <Menu.Item onSelect={onDrawerOpen}>수정하기</Menu.Item>
          <Menu.Item onSelect={onModalOpen}>삭제하기</Menu.Item>
        </Menu.DropdownList>
      </Menu>
      <EditCommentDrawer
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        onConfirm={handleChangeConfirm}
        drawerTitle={titleOnCommentEdit}
        defaultComment={content}
      />
      <DeleteCommentModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

const EditCommentDrawer = ({
  isOpen,
  onClose,
  onConfirm,
  defaultComment,
  drawerTitle = '수정하기',
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  drawerTitle?: string;
  defaultComment?: string;
}) => {
  const handleConfirm = () => {
    onConfirm && onConfirm();
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <Drawer.Header>
        <Drawer.CloseButton position="top-left" />
        <Drawer.Title text={drawerTitle} />
        <Button
          colorScheme="main"
          fill={false}
          size="medium"
          className="flex-shrink-0 border-none !p-0"
          onClick={handleConfirm}
        >
          완료
        </Button>
      </Drawer.Header>
      <Drawer.Content>
        <textarea
          className="h-[60vh] w-full resize-none border-none text-md focus:outline-none"
          defaultValue={defaultComment}
        />
      </Drawer.Content>
    </Drawer>
  );
};

const DeleteCommentModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}) => {
  const handleConfirm = () => {
    onConfirm && onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-lg font-bold">
        정말 삭제할까요?
        <p className="text-xs font-normal text-black-500">
          한번 삭제하면 되돌릴 수 없어요.
        </p>
      </div>
      <div className="flex justify-end gap-[1rem]">
        <Button onClick={onClose} fill={false} colorScheme="grey" size="small">
          취소
        </Button>
        <Button onClick={handleConfirm} size="small">
          확인
        </Button>
      </div>
    </Modal>
  );
};
