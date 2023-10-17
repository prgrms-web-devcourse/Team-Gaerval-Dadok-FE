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
    default: {
      return 'BookArchive';
    }
  }
};

const TopHeader = ({ pathname, children }: TopHeaderProps) => {
  return (
    <div className="flex w-full max-w-[43rem] items-center justify-between pb-[0.8rem]">
      <p className="text-xl font-bold text-main-900">
        {getHeaderLabel(pathname)}
      </p>
      {children}
    </div>
  );
};

export default TopHeader;
