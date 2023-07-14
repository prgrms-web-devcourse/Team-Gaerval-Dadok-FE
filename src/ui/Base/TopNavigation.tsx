import { IconLeftArrow, IconOptions } from '@public/icons';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props {
  backgroundColor?: 'bg-background' | 'bg-white';
  backButton?: boolean;
  titleAlign?: 'center' | 'left';
  title?: string;
  isOwner?: boolean;
}

const TopNavigation = ({
  children,
  backButton = true,
  titleAlign = 'center',
  title = '',
  isOwner = false,
  backgroundColor = 'bg-background',
}: PropsWithChildren<Props>) => {
  return (
    <div className={`${CONTAINER_CLASSES} ${backgroundColor}`}>
      <div className="flex">
        {backButton && (
          <div className={`${ICON_CLASSES}`}>
            <Link href="..">
              <IconLeftArrow />
            </Link>
          </div>
        )}
      </div>
      <div className={`${TITLE_CLASSES} ${TITLE_ALIGN_CLASSES[titleAlign]}`}>
        {title}
      </div>
      <div className="flex gap-[1rem]">
        <div className={`${ICON_CLASSES}`}>{children}</div>
        {isOwner && (
          <div className={`${ICON_CLASSES}`}>
            <IconOptions />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavigation;

const CONTAINER_CLASSES =
  'flex gap-[1.5rem] align-middle max-w-[43rem] w-full h-[5.4rem] px-[2rem] py-[1.7rem]';

const TITLE_CLASSES =
  'flex w-full text-md font-regular leading-snug align-text-top';

const ICON_CLASSES = 'flex w-[2rem] h-full hover:cursor-pointer';

const TITLE_ALIGN_CLASSES = {
  center: 'justify-center',
  left: 'justify-left',
};
