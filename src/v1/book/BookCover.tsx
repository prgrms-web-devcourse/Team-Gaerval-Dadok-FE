import { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';

import { DATA_URL } from '@/constants/dataUrl';

type BookCoverSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | '2xlarge';

type BookCoverProps = Required<
  Pick<ComponentPropsWithoutRef<typeof Image>, 'src'>
> & {
  title?: string;
  size?: BookCoverSize;
};

const getCoverSizeClasses = (size: BookCoverSize) => {
  switch (size) {
    case 'xsmall': {
      return 'w-[6.5rem] h-[9.1rem]';
    }
    case 'small': {
      return 'w-[7.0rem] h-[9.8rem]';
    }
    case 'medium': {
      return 'w-[7.5rem] h-[10.5rem]';
    }
    case 'large': {
      return 'w-[9.0rem] h-[12.6rem]';
    }
    case 'xlarge': {
      return 'w-[11.0rem] h-[15.4rem]';
    }
    case '2xlarge': {
      return 'w-[18.0rem] h-[25.2rem]';
    }
  }
};

const BookCover = ({ src, title, size = 'medium' }: BookCoverProps) => {
  const sizeClasses = getCoverSizeClasses(size);

  return (
    <div className={`relative ${sizeClasses}`}>
      <Image
        src={src}
        alt={title || 'book-cover'}
        placeholder="blur"
        blurDataURL={DATA_URL['placeholder']}
        className="object-fit rounded-[0.5rem] shadow-bookcover"
        fill
      />
    </div>
  );
};

export default BookCover;
