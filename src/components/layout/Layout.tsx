'use client';

import { usePathname } from 'next/navigation';

import BottomNavigation from '@/components/common/BottomNavigation';

type LayoutProps = {
  children?: React.ReactNode;
};

const rootPaths = ['/bookarchive', '/book/search', '/group', '/profile/me'];

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isRootPath = pathname && rootPaths.includes(pathname);

  const dynamicClass = isRootPath
    ? 'pb-[calc(env(safe-area-inset-bottom)+7rem)] pt-[calc(env(safe-area-inset-top)+2rem)]'
    : 'pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[calc(env(safe-area-inset-top)+5.4rem)]';

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
