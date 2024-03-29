import { PropsWithChildren } from 'react';

type TopHeaderProps = PropsWithChildren<{
  text: string;
}>;

const TopHeader = ({ text, children }: TopHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between pb-[2.8rem]">
      <h1 className="text-xl font-bold text-main-900">{text}</h1>
      {children}
    </div>
  );
};

export default TopHeader;
