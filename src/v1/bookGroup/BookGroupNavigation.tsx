import {
  ReactNode,
  Children,
  createContext,
  isValidElement,
  useContext,
  useRef,
} from 'react';
import { useRouter } from 'next/navigation';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import TopNavigation from '@/v1/base/TopNavigation';
import CommentDrawer from '@/v1/comment/CommentDrawer';
import { IconArrowLeft, IconHamburger, IconPost } from '@public/icons';
import {
  useBookGroupOwner,
  useBookGroupTitle,
  useBookGroupJoinInfo,
} from '@/queries/group/useBookGroupQuery';
import useToast from '@/v1/base/Toast/useToast';
import useDisclosure from '@/hooks/useDisclosure';
import useCreateBookGroupCommentMutation from '@/queries/group/useCreateBookGroupCommentMutation';
import { isAxiosErrorWithCustomCode } from '@/utils/helpers';
import { SERVICE_ERROR_MESSAGE } from '@/constants';

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

  return <>{owner.isMe && <IconHamburger />}</>;
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
