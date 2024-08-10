import { PropsWithChildren } from 'react';

type TopHeaderProps = PropsWithChildren<{
  text: string;
  className?: string;
}>;

const TopHeader = ({ text, className, children }: TopHeaderProps) => {
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 mx-auto flex w-full max-w-[43rem] items-center justify-between bg-white px-[2rem] pt-[calc(env(safe-area-inset-top)+2rem)] ${className}`}
    >
      <h1 className="text-main-900 font-heading-bold">{text}</h1>
      {children}
    </header>
  );
};

export default TopHeader;
