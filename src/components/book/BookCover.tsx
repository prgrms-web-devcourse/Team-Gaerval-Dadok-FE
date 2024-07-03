'use client';

import { ComponentPropsWithoutRef, useState } from 'react';

import { DATA_URL } from '@/constants';

import Image from '@/components/common/Image';

type BookCoverSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | '2xlarge'
  | 'fill';

type BookCoverProps = Partial<
  Pick<ComponentPropsWithoutRef<typeof Image>, 'src'>
> & {
  title?: string;
  size?: BookCoverSize;
};

const getCoverSize = (size: BookCoverSize) => {
  switch (size) {
    case 'xsmall': {
      return {
        sizeClasses: 'w-[6.5rem] h-[9.1rem]',
        sizeProps: { width: 65, height: 91 },
      } as const;
    }
    case 'small': {
      return {
        sizeClasses: 'w-[7.0rem] h-[9.8rem]',
        sizeProps: { width: 70, height: 98 },
      } as const;
    }
    case 'medium': {
      return {
        sizeClasses: 'w-[7.5rem] h-[10.5rem]',
        sizeProps: { width: 75, height: 105 },
      } as const;
    }
    case 'large': {
      return {
        sizeClasses: 'w-[9.0rem] h-[12.6rem]',
        sizeProps: { width: 90, height: 126 },
      } as const;
    }
    case 'xlarge': {
      return {
        sizeClasses: 'w-[11.0rem] h-[15.4rem]',
        sizeProps: { width: 110, height: 154 },
      } as const;
    }
    case '2xlarge': {
      return {
        sizeClasses: 'w-[14.0rem] h-[19.6rem]',
        sizeProps: { width: 140, height: 196 },
      } as const;
    }
    case 'fill':
      return {
        sizeClasses: 'w-full aspect-[5/7]',
        sizeProps: { fill: true, sizes: '100%' },
      };
  }
};

const BookCover = ({ src, title, size = 'medium' }: BookCoverProps) => {
  const [isError, setIsError] = useState(false);

  const { sizeClasses, sizeProps } = getCoverSize(size);
  const defaultCoverClass = src ? '' : 'shadow-bookcover';

  return (
    <div
      className={`relative flex-shrink-0 ${sizeClasses} rounded-[0.5rem] bg-black-300 ${defaultCoverClass}`}
    >
      {src && !isError ? (
        <Image
          src={src}
          alt={title || 'book-cover'}
          placeholder="blur"
          blurDataURL={DATA_URL['placeholder']}
          className={`object-fit h-full w-full rounded-[0.5rem] shadow-bookcover`}
          onError={() => setIsError(true)}
          {...sizeProps}
        />
      ) : (
        /** default cover line */
        <div className="absolute left-[5%] h-full w-[0.3rem] bg-black-400" />
      )}
    </div>
  );
};

export default BookCover;
