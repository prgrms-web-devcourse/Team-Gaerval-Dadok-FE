'use client';

import { APIBook } from '@/types/book';
import ColorThief from 'colorthief';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const BookInBookshelf = ({
  imageUrl,
  bookId,
}: Pick<APIBook, 'bookId' | 'title' | 'imageUrl'>) => {
  const [bookSpineColor, setBookSpineColor] = useState<string>();

  const handleOnLoadImage = (image: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const colorHex = colorThief
      .getPalette(image, 2)[0]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
    setBookSpineColor(`#${colorHex}`);
  };

  return (
    <div
      className="relative flex"
      style={{
        visibility: bookSpineColor ? 'visible' : 'hidden',
        transformStyle: 'preserve-3d',
        transform: 'perspective(140px)',
      }}
    >
      <div
        className="h-full w-[1.5rem]"
        style={{
          backgroundColor: bookSpineColor,
          transform: 'rotateY(320deg) translateX(0.7rem) translateZ(0.2rem)',
        }}
      />
      <Link
        href={`/book/${bookId}`}
        style={{
          transform: 'rotateY(22deg)',
        }}
      >
        <Image
          className="h-auto w-auto"
          src={imageUrl}
          width={120}
          height={110}
          alt="book cover"
          onLoadingComplete={handleOnLoadImage}
          quality={100}
        />
      </Link>
    </div>
  );
};

export default BookInBookshelf;
