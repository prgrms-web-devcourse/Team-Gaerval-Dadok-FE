import Link from 'next/link';

import {
  IconBookarchive,
  IconDiscover,
  IconGroup,
  IconProfile,
} from '@public/icons';

import useDisclosure from '@/hooks/useDisclosure';
import { isAuthed } from '@/utils/helpers';

import LoginBottomSheet from '@/v1/profile/LoginBottomSheet';

type BottomNavigationProps = {
  pathname: string;
};

const icons = [
  {
    icon: <IconBookarchive />,
    label: '북카이브',
    href: '/bookarchive',
  },
  {
    icon: <IconDiscover />,
    label: '도서 검색',
    href: '/book/search',
  },
  {
    icon: <IconGroup />,
    label: '독서 모임',
    href: '/group',
  },
  {
    icon: <IconProfile />,
    label: '내 프로필',
    href: '/profile/me',
  },
] as const;

const iconColor = {
  active: 'fill-main-900 text-main-900',
  inactive: 'fill-placeholder text-placeholder',
} as const;

const BottomNavigation = ({ pathname }: BottomNavigationProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickProfileIcon = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (isAuthed()) return;

    onOpen();
    event.preventDefault();
  };

  return (
    <>
      <nav className="absolute bottom-0 left-0 flex h-[6.4rem] w-full max-w-[43rem] justify-between border-t-[0.05rem] border-black-200 bg-white px-[2.6rem] pb-[1.2rem] pt-[0.8rem]">
        {icons.map(({ icon, label, href }) => (
          <Link key={label} type="button" href={href}>
            <button
              className={`flex h-[4.4rem] w-[4.6rem] flex-col items-center justify-center text-xs font-bold ${
                href === pathname ? iconColor.active : iconColor.inactive
              }`}
              onClick={
                href === '/profile/me' ? handleClickProfileIcon : undefined
              }
            >
              <div className="h-[2.6rem] w-[2.6rem] text-placeholder">
                {icon}
              </div>
              {label}
            </button>
          </Link>
        ))}
      </nav>
      <LoginBottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default BottomNavigation;
