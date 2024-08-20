import { PropsWithChildren, ReactNode } from 'react';

interface TopNavigationProps {
  children?: ReactNode;
}

type ItemProps = TopNavigationProps;

const TopNavigation = ({ children }: TopNavigationProps) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 mx-auto flex h-[2.4rem] w-full max-w-[43rem] items-center justify-center bg-white px-[4rem] pb-[2.7rem] pt-[calc(env(safe-area-inset-top)+2.7rem)] font-body1-regular">
      {children}
    </header>
  );
};

const LeftItem = ({ children }: ItemProps) => {
  return (
    <nav className="absolute left-[0rem] flex pl-[2rem] [&_svg]:h-[2rem] [&_svg]:w-[2rem] [&_svg]:cursor-pointer">
      {children}
    </nav>
  );
};

type CenterItemProps = PropsWithChildren<{ textAlign?: 'left' | 'center' }>;

const textAligns = {
  left: 'text-left',
  center: 'text-center',
} as const;

const CenterItem = ({ children, textAlign = 'center' }: CenterItemProps) => {
  const alignClassName = textAligns[textAlign];
  return (
    <div className={`w-full px-[1.5rem] ${alignClassName}`}>{children}</div>
  );
};

const RightItem = ({ children }: ItemProps) => {
  return (
    <div className="absolute right-[0rem] flex gap-[1rem] pr-[2rem] [&_svg]:h-[2rem] [&_svg]:w-[2rem] [&_svg]:cursor-pointer">
      {children}
    </div>
  );
};

TopNavigation.LeftItem = LeftItem;

TopNavigation.CenterItem = CenterItem;

TopNavigation.RightItem = RightItem;

export default TopNavigation;
