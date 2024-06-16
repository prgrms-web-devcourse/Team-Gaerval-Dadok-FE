import { useRouter } from 'next/navigation';
import {
  Children,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useRef,
} from 'react';

import { SERVICE_ERROR_MESSAGE } from '@/constants';
import { IconArrowLeft, IconPost } from '@public/icons';
import { isAxiosErrorWithCustomCode } from '@/utils/helpers';

import useDisclosure from '@/hooks/useDisclosure';
import {
  useBookGroupJoinInfo,
  useBookGroupOwner,
  useBookGroupTitle,
} from '@/queries/group/useBookGroupQuery';
import useCreateBookGroupCommentMutation from '@/queries/group/useCreateBookGroupCommentMutation';
import useDeleteBookGroupMutation from '@/queries/group/useDeleteBookGroupMutation';

import SSRSafeSuspense from '@/v1/base/SSRSafeSuspense';
import Button from '@/v1/base/Button';
import Menu from '@/v1/base/Menu';
import Modal from '@/v1/base/Modal';
import useToast from '@/v1/base/Toast/useToast';
import TopNavigation from '@/v1/base/TopNavigation';
import CommentDrawer from '@/v1/comment/CommentDrawer';

const NavigationContext = createContext({} as { groupId: number });

const BookGroupNavigation = ({
  groupId,
  children,
}: {
  groupId: number;
  children: ReactNode;
}) => {
  return (
    <NavigationContext.Provider value={{ groupId }}>
      <TopNavigation>
        <TopNavigation.LeftItem>
          {getTargetChildren(children, BackButton)}
        </TopNavigation.LeftItem>
        <TopNavigation.CenterItem textAlign="left">
          <SSRSafeSuspense fallback={<TitleSkeleton />}>
            {getTargetChildren(children, Title)}
          </SSRSafeSuspense>
        </TopNavigation.CenterItem>
        <TopNavigation.RightItem>
          <SSRSafeSuspense>
            {getTargetChildren(children, WriteButton)}
            {getTargetChildren(children, MenuButton)}
          </SSRSafeSuspense>
        </TopNavigation.RightItem>
      </TopNavigation>
    </NavigationContext.Provider>
  );
};

type BackButtonProps =
  | {
      routeOption: 'push';
      href: string;
    }
  | {
      routeOption: 'replace';
      href: string;
    }
  | {
      routeOption?: 'back';
    };

const BackButton = (props: BackButtonProps) => {
  const { routeOption } = props;
  const router = useRouter();

  const handleClick = () => {
    switch (routeOption) {
      case 'push':
        return router.push(props.href);
      case 'replace':
        return router.replace(props.href);
      case 'back':
        return router.back();
      default:
        return router.back();
    }
  };

  return (
    <a onClick={handleClick}>
      <IconArrowLeft />
    </a>
  );
};

const Title = () => {
  const { groupId } = useContext(NavigationContext);
  const { data: title } = useBookGroupTitle(groupId);

  return <p className="w-[90%] truncate">{title}</p>;
};

const MenuButton = () => {
  const { groupId } = useContext(NavigationContext);
  const { data: owner } = useBookGroupOwner(groupId);

  const router = useRouter();

  const deleteBookGroup = useDeleteBookGroupMutation();

  const { show: showToast } = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleEditClick = () => {
    router.push(`/group/${groupId}/edit`);
    return;
  };

  const handleModalConfirm = async () => {
    await deleteBookGroup.mutateAsync(groupId, {
      onSuccess: () => {
        showToast({ type: 'success', message: '모임을 삭제했어요' });
        router.replace('/group');
      },
      onError: error => {
        if (isAxiosErrorWithCustomCode(error)) {
          const { code } = error.response.data;
          const message = SERVICE_ERROR_MESSAGE[code];
          showToast({ type: 'error', message });
          return;
        }

        showToast({ type: 'error', message: '잠시 후 다시 시도해주세요' });
      },
    });
  };

  return (
    <>
      {owner.isMe && (
        <>
          <Menu>
            <Menu.Toggle />
            <Menu.DropdownList>
              <Menu.Item onSelect={handleEditClick}>수정하기</Menu.Item>
              <Menu.Item onSelect={onOpen}>삭제하기</Menu.Item>
            </Menu.DropdownList>
          </Menu>
          <DeleteBookGroupModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleModalConfirm}
          />
        </>
      )}
    </>
  );
};

const WriteButton = () => {
  const { groupId } = useContext(NavigationContext);
  const { data: joinInfo } = useBookGroupJoinInfo(groupId);
  const { isMember } = joinInfo;

  const { show: showToast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const createComment = useCreateBookGroupCommentMutation(groupId);

  const handleCommentCreate = () => {
    const comment = commentRef.current?.value;

    if (!comment) {
      return;
    }

    createComment.mutate(comment, {
      onSuccess: () => {
        onClose();
        showToast({ type: 'success', message: '게시글을 등록했어요 🎉' });
      },
      onError: error => {
        if (isAxiosErrorWithCustomCode(error)) {
          const { code } = error.response.data;
          const message = SERVICE_ERROR_MESSAGE[code];
          showToast({ type: 'error', message });
          return;
        }

        showToast({ type: 'error', message: '게시글을 등록하지 못했어요 🥲' });
      },
    });
  };

  return (
    <>
      {isMember && (
        <>
          <button onClick={onOpen}>
            <IconPost />
          </button>
          <CommentDrawer
            title="게시글 작성하기"
            placeholder="나누고 싶은 이야기가 있었다면 게시글에 남겨보세요"
            isOpen={isOpen}
            onClose={onClose}
            ref={commentRef}
            onConfirm={handleCommentCreate}
          />
        </>
      )}
    </>
  );
};

BookGroupNavigation.BackButton = BackButton;
BookGroupNavigation.Title = Title;
BookGroupNavigation.MenuButton = MenuButton;
BookGroupNavigation.WriteButton = WriteButton;

export default BookGroupNavigation;

const TitleSkeleton = () => (
  <div className="h-[1.5rem] w-[40%] animate-pulse bg-black-400"></div>
);

const DeleteBookGroupModal = ({
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
        <p>모임을 정말 삭제할까요?</p>
        <p className="leading-tight text-black-500 font-body2-regular">
          참여 중인 모임원이 있는 경우, 모임을 삭제할 수 없어요.
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

const BackButtonType = (<BackButton />).type;
const TitleType = (<Title />).type;
const MenuButtonType = (<MenuButton />).type;
const WriteButtonType = (<WriteButton />).type;

const getTargetChildren = (
  children: ReactNode,
  targetType:
    | typeof BackButtonType
    | typeof TitleType
    | typeof MenuButtonType
    | typeof WriteButtonType
) => {
  const childrenArray = Children.toArray(children);

  return childrenArray.find(
    child => isValidElement(child) && child.type === targetType
  );
};
