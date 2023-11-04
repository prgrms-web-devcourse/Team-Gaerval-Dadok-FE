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

const rootPaths = ['/bookarchive', '/book/search', '/group', '/profile/me'];

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isRootPath = pathname && rootPaths.includes(pathname);

  const dynamicClass = isRootPath ? 'pb-[6.4rem] pt-[2rem]' : 'py-[2rem]';

  return (
    <>
      <div
        className={`h-screen w-full max-w-[43rem] animate-page-transition overflow-auto px-[2rem] ${dynamicClass}`}
      >
        {isRootPath && <TopHeader pathname={pathname} />}
        {children}
      </div>
      {isRootPath && <BottomNavigation pathname={pathname} />}
    </>
  );
};

export default Layout;
