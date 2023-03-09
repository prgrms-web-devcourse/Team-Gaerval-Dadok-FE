'use client';

import { APIBook } from '@/types/book';
import { getBookColor } from '@/utils/getBookColor';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InteractiveBookFront from './InteractiveBookFront';
import InteractiveBookSide from './InteractiveBookSide';
import InteractiveBookTop from './InteractiveBookTop';

const BOOK_WIDTH = 8.5;
const BOOK_HEIGHT = 11;
const BOOK_THICK = 2;

const InteractiveBook = ({
  imageUrl,
  bookId,
}: Pick<APIBook, 'imageUrl' | 'bookId'>) => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    getBookColor(imageUrl, setColor);
  }, [imageUrl]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '30rem',
      }}
    >
      <Box
        as={Link}
        href={`/book/${bookId}`}
        sx={{
          position: 'absolute',
          width: `${BOOK_WIDTH}rem`,
          height: `${BOOK_HEIGHT}rem`,
          transformStyle: 'preserve-3d',
          transform: 'translateX(4.5rem) rotateY(30deg)',
          transition: '0.8s ease',

          '> div, img': {
            position: 'absolute',
            boxSizing: 'border-box',
            transformOrigin: 'top left',
          },
        }}
      >
        <InteractiveBookTop bookThick={BOOK_THICK} />
        <InteractiveBookSide bookColor={color} bookThick={BOOK_THICK} />
        <InteractiveBookFront imageUrl={imageUrl} />
      </Box>
    </Flex>
  );
};

export default InteractiveBook;
