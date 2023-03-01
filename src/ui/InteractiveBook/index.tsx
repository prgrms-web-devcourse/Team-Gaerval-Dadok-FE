'use client';

import { Box, Flex } from '@chakra-ui/react';
import { usePalette } from 'color-thief-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
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

  const [clickedCount, setClickedCount] = useState<number>(0);
  const bookRef = useRef<HTMLDivElement>(null);

  const onClickBook = () => {
    if (clickedCount > 0) return router.push('/bookdetailpage');
    bookRef.current?.focus();

    setClickedCount(clickedCount + 1);
  };

  const onBlurBook = () => {
    bookRef.current?.blur();

    setClickedCount(0);
  };

  if (loading) return null;
  if (!data) return null;

  return (
    <Flex
      display="flex"
      justifyContent="center"
      alignItems="center"
      ref={bookRef}
      onClick={onClickBook}
      onBlur={onBlurBook}
      tabIndex={0}
      cursor="pointer"
      _focus={{
        '> div': {
          transform: 'translateX(2rem) rotateY(15deg)',
        },
      }}
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

// const moveLeft = keyframes`
//   from { left: 0; }
//   to   { left: -2rem; }
// `;

// const moveForward = keyframes`
//   from { top: 0; }
//   to   { top: 45vh; }
// `;

// css={{
//   '&:focus': {
//     '> div': {
//       animationName: `${moveLeft}, ${moveForward}`,
//       animationTimingFunction: 'ease',
//       animationFillMode: 'forwards',
//       animation: `${moveLeft} 0.8s ease forwards`,
//     },
//   },
// }}
