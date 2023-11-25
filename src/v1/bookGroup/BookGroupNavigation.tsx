import {
  ReactNode,
  Children,
  createContext,
  isValidElement,
  useContext,
} from 'react';
import { useRouter } from 'next/navigation';

import TopNavigation from '@/ui/Base/TopNavigation';
import { IconArrowLeft, IconHamburger, IconPost } from '@public/icons';
import {
  useBookGroupOwner,
  useBookGroupTitle,
  useBookGroupJoinInfo,
} from '@/queries/group/useBookGroupQuery';

const NavigationContext = createContext({} as { groupId: number });

const getTargetChildren = (children: ReactNode, Target: () => JSX.Element) => {
  const childrenArray = Children.toArray(children);

  return childrenArray.filter(
    child => isValidElement(child) && child.type === (<Target />).type
  );
};

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
          {getTargetChildren(children, Title)}
        </TopNavigation.CenterItem>
        <TopNavigation.RightItem>
          {getTargetChildren(children, WriteButton)}
          {getTargetChildren(children, MenuButton)}
        </TopNavigation.RightItem>
      </TopNavigation>
    </NavigationContext.Provider>
  );
};

const BackButton = () => {
  const router = useRouter();

  return (
    <a onClick={router.back}>
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
