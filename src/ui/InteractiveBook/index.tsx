'use client';

import { publicApi } from '@/apis/core/axios';
import { APIBook } from '@/types/book';
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
  const [bookColor, setBookColor] = useState<string>('');

  const getBookColor = async (
    imageUrl: string,
    setter: (hex: string) => void
  ) => {
    try {
      const colors = await publicApi('/api/getBookColor/', {
        params: {
          url: imageUrl,
        },
      });

      setter(colors.data.colors[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookColor(imageUrl, setBookColor);
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
        <InteractiveBookSide bookColor={bookColor} bookThick={BOOK_THICK} />
        <InteractiveBookFront imageUrl={imageUrl} />
      </Box>
    </Flex>
  );
};

export default InteractiveBook;
