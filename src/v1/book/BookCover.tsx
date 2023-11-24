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

const getCoverSize = (size: BookCoverSize) => {
  switch (size) {
    case 'xsmall': {
      return ['w-[6.5rem] h-[9.1rem]', { width: 65, height: 91 }] as const;
    }
    case 'small': {
      return ['w-[7.0rem] h-[9.8rem]', { width: 70, height: 98 }] as const;
    }
    case 'medium': {
      return ['w-[7.5rem] h-[10.5rem]', { width: 75, height: 105 }] as const;
    }
    case 'large': {
      return ['w-[9.0rem] h-[12.6rem]', { width: 90, height: 126 }] as const;
    }
    case 'xlarge': {
      return ['w-[11.0rem] h-[15.4rem]', { width: 110, height: 154 }] as const;
    }
    case '2xlarge': {
      return ['w-[18.0rem] h-[25.2rem]', { width: 180, height: 252 }] as const;
    }
  }
};

const BookCover = ({ src, title, size = 'medium' }: BookCoverProps) => {
  const [sizeClasses, sizeProps] = getCoverSize(size);

  return (
    <div className={`relative flex-shrink-0 ${sizeClasses}`}>
      <Image
        src={src}
        alt={title || 'book-cover'}
        placeholder="blur"
        blurDataURL={DATA_URL['placeholder']}
        className={`object-fit h-full w-full rounded-[0.5rem] shadow-bookcover`}
        {...sizeProps}
      />
    </div>
  );
};

export default BookCover;
