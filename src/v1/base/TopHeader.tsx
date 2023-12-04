import { PropsWithChildren } from 'react';

type TopHeaderProps = PropsWithChildren<{
  pathname: string;
}>;

const getHeaderLabel = (pathname: string) => {
  switch (pathname) {
    case '/bookarchive': {
      return 'BookArchive';
    }
    case '/book/search': {
      return 'Search';
    }
    case '/group': {
      return 'Group';
    }
    case '/profile/me': {
      return 'Profile';
    }
  }
};

const TopHeader = ({ pathname, children }: TopHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between pb-[0.8rem]">
      <h1 className="text-xl font-bold text-main-900">
        {getHeaderLabel(pathname)}
      </h1>
      {children}
    </div>
  );
};

export default TopHeader;
