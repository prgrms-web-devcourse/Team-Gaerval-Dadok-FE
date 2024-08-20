import { PropsWithChildren } from 'react';

type TopHeaderProps = PropsWithChildren<{
  text: string;
}>;

const TopHeader = ({ text, children }: TopHeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between pb-[2rem]">
      <h1 className="text-main-900 font-heading">{text}</h1>
      {children}
    </header>
  );
};

export default TopHeader;
