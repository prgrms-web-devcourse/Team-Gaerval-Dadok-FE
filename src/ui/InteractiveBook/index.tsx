'use client';

import { Box, Flex, useTheme } from '@chakra-ui/react';
import { usePalette } from 'color-thief-react';
import Image from 'next/image';

type BookImageSrcType = {
  src: string;
};

const BOOK_WIDTH = 8.4;
const BOOK_HEIGHT = 12;
const BOOK_THICK = 3;

const InteractiveBook = ({ src }: BookImageSrcType) => {
  const theme = useTheme();
  const { data, loading } = usePalette(src, 2, 'hex');

  if (loading) return null;
  if (!data) return null;

  return (
    <Flex
      style={{
        margin: '0 0.6rem 0 1rem',
        perspective: '30rem',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: `${BOOK_WIDTH}rem`,
          height: `${BOOK_HEIGHT}rem`,
          transformStyle: 'preserve-3d',
          transform:
            'translateX(-1rem) rotateX(-18deg) rotateY(26deg) rotateZ(-4deg)',
          transition: '1s ease',
          cursor: 'pointer',
          _hover: {
            transform:
              'translateX(-3rem) translateY(-3rem) rotateX(-18deg) rotateY(26deg) rotateZ(-4deg)',
          },

          '> div, img': {
            position: 'absolute',
          },
        }}
      >
        {/* 책 옆면 스타일링 */}
        <Box
          width={`${BOOK_THICK}rem`}
          height="100%"
          transform={`translateX(-${BOOK_THICK / 2}rem) rotateY(90deg)`}
          bgColor={data[0]}
        />
        {/* 책 윗면 스타일링 */}
        <Box
          width="100%"
          height={`${BOOK_THICK}rem`}
          transform={`translateY(-${BOOK_THICK / 2}rem) rotateX(90deg)`}
          bgColor="white.600"
        />
        {/* 책 표지 스타일링 */}
        <Image
          width={128}
          height={128}
          src={src}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            filter: `drop-shadow(0.3rem 0.3rem 0.3rem ${theme.colors.white[600]})`,
            transform: `translateZ(${BOOK_THICK / 2}rem)`,
            backgroundColor: data[0],
            // TODO: 책 그림자 추가할 것.
          }}
        />
      </Box>
    </Flex>
  );
};

export default InteractiveBook;
