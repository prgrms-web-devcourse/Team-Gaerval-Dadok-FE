import { useMemo, useRef } from 'react';

import type { Writer } from '@/types/user';

import useDisclosure from '@/hooks/useDisclosure';

import EditCommentDrawer from '@/components/comment/CommentDrawer';
import Avatar from '@/components/common/Avatar';
import Menu from '@/components/common/Menu';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

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
  onEditConfirm?: (commentId: Comment['id'], comment: string) => void;
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
    return (
      <p className="py-[2rem] text-center font-body2-regular">{hiddenText}</p>
    );
  }

  if (comments.length === 0) {
    return (
      <p className="self-center whitespace-pre-line py-[2rem] text-center font-body2-regular">
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
  <p className="font-body2-bold">{name}</p>
);

const Date = ({ date }: { date: string }) => (
  <p className="text-placeholder font-caption1-regular">{date}</p>
);

const CommentContent = ({ content }: { content: string }) => (
  <p className="break-all text-justify font-body1-regular">{content}</p>
);

const CommentActionMenu = ({
  comment,
  titleOnCommentEdit,
  onEditConfirm,
  onDeleteConfirm,
}: {
  comment: Comment;
  titleOnCommentEdit?: string;
  onEditConfirm?: (commentId: Comment['id'], newComment: string) => void;
  onDeleteConfirm?: (commentId: Comment['id']) => void;
}) => {
  const { id: commentId, content } = comment;
  const commentRef = useRef<HTMLTextAreaElement>(null);

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

  const handleEditConfirm = () => {
    const comment = commentRef.current?.value;

    if (!comment) {
      return;
    }

    onEditConfirm && onEditConfirm(commentId, comment);
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
        onConfirm={handleEditConfirm}
        title={titleOnCommentEdit}
        defaultComment={content}
        placeholder={'더 멋진 코멘트를 작성해주세요!'}
        ref={commentRef}
      />
      <DeleteCommentModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onConfirm={handleDeleteConfirm}
      />
    </>
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
      <div className="flex flex-col gap-[0.5rem] leading-loose font-subheading-bold">
        <p>정말 삭제할까요?</p>
        <p className="text-black-500 font-body2-regular">
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
