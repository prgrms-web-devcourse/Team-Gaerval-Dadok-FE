import { PropsWithChildren } from 'react';

type TopHeaderProps = PropsWithChildren<{
  blur?: boolean;
  className?: string;
}>;

const DEFAULT_HEADER_CLASSES =
  'fixed left-0 right-0 top-0 z-30 mx-auto w-full max-w-[43rem] border-0 px-[2rem] pb-[1rem] pt-[calc(env(safe-area-inset-top)+2rem)] transition duration-1000';

const BLUR_HEADER_CLASSES =
  'border-b-black-100 border-b-[0.01rem] bg-[#FFFFFFBF] backdrop-blur-[1.6rem]';

const TopHeader = ({
  blur = false,
  className = '',
  children,
}: TopHeaderProps) => {
  const blurClasses = blur ? BLUR_HEADER_CLASSES : 'bg-white';

  return (
    <header className={`${DEFAULT_HEADER_CLASSES} ${blurClasses} ${className}`}>
      {children}
    </header>
  );
};

export default TopHeader;
