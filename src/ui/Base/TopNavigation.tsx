import { IconLeftArrow, IconOptions } from '@public/icons';
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
    <div className="flex w-full justify-center gap-[1.5rem] bg-opacity-0 px-[2rem] py-[1.7rem]">
      <Link href=".">
        <IconLeftArrow className="hover:cursor-pointer" />
      </Link>
      <div
        className={`flex w-full items-center pr-[3.5rem] text-md font-regular leading-[1.9rem] ${TITLE_ALIGN_CLASSES[titleAlign]}`}
      >
        {title}
      </div>
      <div className="absolute right-0 flex gap-[1rem] pr-[2rem]">
        {children}
        {isOwner && <IconOptions className="hover:cursor-pointer" />}
      </div>
    </div>
  );
};

export default TopNavigation;

const TITLE_ALIGN_CLASSES = {
  center: 'justify-center',
  left: 'justify-left',
};
