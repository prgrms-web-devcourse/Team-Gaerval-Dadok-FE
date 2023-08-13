import { PropsWithChildren, ReactNode } from 'react';

interface TopNavigationProps {
  children?: ReactNode;
}

type ItemProps = TopNavigationProps;

const TopNavigation = ({ children }: TopNavigationProps) => {
  return (
    <div className="relative flex w-full items-center justify-center bg-opacity-0 px-[2rem] py-[1.7rem] text-md">
      {children}
    </div>
  );
};

const LeftItem = ({ children }: ItemProps) => {
  return (
    <div className="absolute left-[2rem] [&_svg]:h-[2rem] [&_svg]:w-[2rem] [&_svg]:cursor-pointer">
      {children}
    </div>
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
    <div className={`w-full px-[3.5rem] ${alignClassName}`}>{children}</div>
  );
};

const RightItem = ({ children }: ItemProps) => {
  return (
    <div className="absolute right-[2rem] flex gap-[1rem] [&_svg]:h-[2rem] [&_svg]:w-[2rem] [&_svg]:cursor-pointer">
      {children}
    </div>
  );
};

TopNavigation.LeftItem = LeftItem;

TopNavigation.CenterItem = CenterItem;

TopNavigation.RightItem = RightItem;

export default TopNavigation;
