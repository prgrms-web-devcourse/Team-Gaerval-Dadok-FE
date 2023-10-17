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

const BASE_LAYOUT_CLASS =
  'h-screen w-full max-w-[43rem] px-[2rem] animate-page-transition overflow-auto';

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isRootPath = pathname && rootPaths.includes(pathname);

  const DYNAMIC_LAYOUT_CLASS = isRootPath
    ? 'pb-[6.4rem] pt-[2rem]'
    : 'py-[2rem]';

  return (
    <>
      <div className={`${BASE_LAYOUT_CLASS} ${DYNAMIC_LAYOUT_CLASS}`}>
        {isRootPath && <TopHeader pathname={pathname} />}
        {children}
      </div>
      {isRootPath && <BottomNavigation pathname={pathname} />}
    </>
  );
};

export default Layout;
