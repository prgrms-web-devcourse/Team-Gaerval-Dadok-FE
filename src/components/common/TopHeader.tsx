import { PropsWithChildren } from 'react';

type TopHeaderProps = PropsWithChildren<{
  text: string;
  blur?: boolean;
  className?: string;
}>;

const DEFAULT_HEADER_CLASSES =
  'fixed left-0 right-0 top-0 z-30 mx-auto flex w-full max-w-[43rem] items-center justify-between border-0 px-[2rem] pb-[1rem] pt-[calc(env(safe-area-inset-top)+2rem)] transition duration-1000';

const BLUR_HEADER_CLASSES =
  'border-b-black-100 border-b-[0.01rem] bg-[#FFFFFFBF] backdrop-blur-[1.6rem]';

const TopHeader = ({
  text,
  blur = false,
  className = '',
  children,
}: TopHeaderProps) => {
  const blurClasses = blur ? BLUR_HEADER_CLASSES : 'bg-white';

  return (
    <header className={`${DEFAULT_HEADER_CLASSES} ${blurClasses} ${className}`}>
      <h1 className="text-main-900 font-heading-bold">{text}</h1>
      {children}
    </header>
  );
};

export default TopHeader;
