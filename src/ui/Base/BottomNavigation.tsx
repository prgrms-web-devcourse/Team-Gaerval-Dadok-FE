'use client';

import {
  IconBookarchive,
  IconDiscover,
  IconGroup,
  IconProfile,
} from '@public/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  const getIconColorClasses = (href: string) => {
    return href === pathname
      ? 'fill-main-900 text-main-900'
      : 'fill-placeholder text-placeholder';
  };

  return (
    <div className="border-top-[0.05rem] fixed bottom-0 flex h-[6.4rem] w-full max-w-[39.3rem] justify-between border-black-200 bg-white px-[2.6rem] pb-[1.2rem] pt-[0.8rem]">
      {icons.map(({ icon, label, href }) => (
        <Link key={label} type="button" href={href}>
          <div
            className={`flex h-[4.4rem] w-[4.6rem] flex-col items-center justify-center text-xs font-bold ${getIconColorClasses(
              href
            )}`}
          >
            {icon}
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
