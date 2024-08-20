'use client';

import { usePathname } from 'next/navigation';

import BottomNavigation from '@/v1/base/BottomNavigation';

type LayoutProps = {
  children?: React.ReactNode;
};

const rootPaths = ['/bookarchive', '/book/search', '/group', '/profile/me'];

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isRootPath = pathname && rootPaths.includes(pathname);

  const dynamicClass = isRootPath
    ? 'pb-[calc(env(safe-area-inset-bottom)+7rem)] pt-[2rem]'
    : 'pt-[5.4rem] pb-[2rem]';

  return (
    <>
      <main
        className={`h-auto min-h-[100dvh] w-full max-w-[43rem] animate-page-transition px-[2rem] ${dynamicClass}`}
      >
        {children}
      </main>
      {isRootPath && <BottomNavigation pathname={pathname} />}
    </>
  );
};

export default Layout;
