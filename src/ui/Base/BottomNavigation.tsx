'use client';

import {
  IconBookarchive,
  IconDiscover,
  IconGroup,
  IconProfile,
} from '@public/icons';
import { usePathname } from 'next/navigation';
import BottomNavigationItem from './BottomNavigationItem';

const BASE_ICON_CLASSES = 'h-[2.6rem] w-[2.6rem] text-placeholder';

const icons = [
  {
    icon: <IconBookarchive className={`${BASE_ICON_CLASSES}`} />,
    label: '북카이브',
    href: '/bookarchive',
  },
  {
    icon: <IconDiscover className={`${BASE_ICON_CLASSES}`} />,
    label: '도서 검색',
    href: '/book/search',
  },
  {
    icon: <IconGroup className={`${BASE_ICON_CLASSES}`} />,
    label: '독서 모임',
    href: '/group',
  },
  {
    icon: <IconProfile className={`${BASE_ICON_CLASSES}`} />,
    label: '내 프로필',
    href: '/profile/me',
  },
];

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="border-top-[0.05rem] fixed bottom-0 flex h-[6.4rem] w-full max-w-[39.3rem] justify-between border-black-200 bg-white px-[2.6rem] pb-[1.2rem] pt-[0.8rem]">
      {icons.map(({ icon, label, href }) => (
        <BottomNavigationItem
          key={label}
          icon={icon}
          label={label}
          href={href}
          isActive={pathname === href}
        />
      ))}
    </div>
  );
};

export default BottomNavigation;
