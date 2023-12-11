import {
  ReactNode,
  Children,
  createContext,
  isValidElement,
  useContext,
} from 'react';
import { useRouter } from 'next/navigation';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import TopNavigation from '@/v1/base/TopNavigation';
import { IconArrowLeft, IconHamburger, IconPost } from '@public/icons';
import {
  useBookGroupOwner,
  useBookGroupTitle,
  useBookGroupJoinInfo,
} from '@/queries/group/useBookGroupQuery';

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

  return (
    <a
      onClick={() =>
        routeOption === 'push'
          ? router.push(props.href)
          : routeOption === 'replace'
          ? router.replace(props.href)
          : router.back()
      }
    >
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

  return <>{isMember && <IconPost />}</>;
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
