'use client';

import {
  IconBookarchive,
  IconDiscover,
  IconGroup,
  IconProfile,
} from '@public/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
];

const iconColor = {
  active: 'fill-main-900 text-main-900',
  inactive: 'fill-placeholder text-placeholder',
} as const;

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="border-top-[0.05rem] fixed bottom-0 flex h-[6.4rem] w-full max-w-[39.3rem] justify-between border-black-200 bg-white px-[2.6rem] pb-[1.2rem] pt-[0.8rem]">
      {icons.map(({ icon, label, href }) => (
        <Link key={label} type="button" href={href}>
          <div
            className={`flex h-[4.4rem] w-[4.6rem] flex-col items-center justify-center text-xs font-bold ${
              href === pathname ? iconColor.active : iconColor.inactive
            }`}
          >
            <div className="h-[2.6rem] w-[2.6rem] text-placeholder">{icon}</div>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
