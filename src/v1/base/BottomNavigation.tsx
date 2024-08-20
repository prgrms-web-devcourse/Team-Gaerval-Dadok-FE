import Link from 'next/link';

import {
  IconBookarchive,
  IconDiscover,
  IconGroup,
  IconProfile,
} from '@public/icons';

type BottomNavigationProps = {
  pathname?: string;
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
  inactive: 'fill-black-900 text-black-900',
} as const;

const BottomNavigation = ({ pathname }: BottomNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-[50%] flex w-full max-w-[43rem] -translate-x-1/2 justify-between rounded-t-[2rem] border-t-[0.05rem] border-black-200 bg-white px-[3.2rem] pb-[calc(env(safe-area-inset-bottom)+1.4rem)] pt-[1.4rem] shadow-bottomNav">
      {icons.map(({ icon, label, href }) => (
        <Link key={label} type="button" href={href}>
          <button
            className={`flex h-[4.4rem] min-w-[4.503rem] flex-col items-center justify-center ${
              href === pathname ? iconColor.active : iconColor.inactive
            }`}
          >
            <div className="h-[2.6rem] w-[2.6rem]">{icon}</div>
            <p className="font-caption1-bold">{label}</p>
          </button>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavigation;
