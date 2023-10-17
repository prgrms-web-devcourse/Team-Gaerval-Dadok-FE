'use client';

import { usePathname } from 'next/navigation';

import TopHeader from '@/ui/Base/TopHeader';
import BottomNavigation from '@/ui/Base/BottomNavigation';

/**
 * @todo
 * 토스트 추가
 * 크로스 브라우징 - dvh & vh에 대해 고민
 */

type LayoutProps = {
  children: React.ReactNode;
};

// const rootPaths = ['/bookarchive', '/book/search', '/group', '/profile/me'];

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="block h-[20rem] max-w-[43rem] px-[2.0rem] pb-[2.4rem] pt-[2.0rem]">
      <TopHeader pathname={pathname} />
      {children}
      <BottomNavigation pathname={pathname} />
    </div>
  );
};

export default Layout;
