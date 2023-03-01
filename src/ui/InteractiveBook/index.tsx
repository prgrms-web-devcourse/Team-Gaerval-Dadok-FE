'use client';

import { Box, Flex } from '@chakra-ui/react';
import { usePalette } from 'color-thief-react';
import { useRouter } from 'next/navigation';
import InteractiveBookFront from './InteractiveBookFront';
import InteractiveBookSide from './InteractiveBookSide';
import InteractiveBookTop from './InteractiveBookTop';

type BookImageSrcType = {
  src: string;
};

const BOOK_WIDTH = 8.5;
const BOOK_HEIGHT = 11;
const BOOK_THICK = 2;

const InteractiveBook = ({ src }: BookImageSrcType) => {
  const router = useRouter();
  const { data, loading } = usePalette(src, 2, 'hex');

  const onClickBook = () => {
    return router.push('/bookdetailpage');
  };

  if (loading) return null;
  if (!data) return null;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      onClick={onClickBook}
      cursor="pointer"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '30rem',
      }}
    >
      <Box
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
        <InteractiveBookSide bookColor={data[0]} bookThick={BOOK_THICK} />
        <InteractiveBookFront
          src={src}
          bookColor={data[0]}
          bookThick={BOOK_THICK}
        />
      </Box>
    </Flex>
  );
};

export default InteractiveBook;
