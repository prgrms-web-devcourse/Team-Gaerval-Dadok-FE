import { IconArrowLeft, IconHamburger } from '@public/icons';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  titleAlign?: 'center' | 'left';
  title?: string;
  isOwner?: boolean;
}

const TopNavigation = ({
  children,
  titleAlign = 'center',
  title = '',
  isOwner = false,
}: Props) => {
  return (
    <div className="relative flex h-[5.4rem] w-full gap-[1.5rem] bg-opacity-0 px-[2rem] py-[1.7rem]">
      <Link href=".">
        <IconArrowLeft className="hover:cursor-pointer" />
      </Link>
      <div
        className={`flex w-full pr-[3.5rem] text-md font-normal leading-[1.9rem] ${TITLE_ALIGN_CLASSES[titleAlign]}`}
      >
        {title}
      </div>
      <div className="absolute right-[2rem] flex gap-[1rem]">
        {children}
        {isOwner && <IconHamburger className="hover:cursor-pointer" />}
      </div>
    </div>
  );
};

export default TopNavigation;

const TITLE_ALIGN_CLASSES = {
  center: 'justify-center',
  left: 'justify-start',
};
