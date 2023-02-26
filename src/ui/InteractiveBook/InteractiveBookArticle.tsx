import { Box, Flex } from '@chakra-ui/react';
import { usePalette } from 'color-thief-react';
import Image from 'next/image';

type BookImageSrcType = {
  /**
   * jsdoc
   * usePalette imgSrc parameter type
   *
   * @example
   * ```ts
   * usePalette(imgSrc: string, colorCount: number | undefined, format: "hex");
   * ```
   */
  src: Parameters<typeof usePalette>[0];
};

const InteractiveBookArticle = ({ src }: BookImageSrcType) => {
  const { data, loading } = usePalette(src, 2, 'hex');

  const bookWidth = 12;
  const bookHeight = 15;
  const bookThick = 2;

  if (loading) return null;
  if (!data) return null;

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{
        perspective: '60rem',
        margin: '3rem',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: `${bookWidth}rem`,
          height: `${bookHeight}rem`,
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(33deg)',
          transition: '1s ease',
          margin: '3rem auto',
          cursor: 'pointer',
          _hover: { transform: 'translateX(-1rem)' },

          '> div, img': {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            top: '0',
            left: '0',
          },
        }}
      >
        {/* 책 옆면 스타일링 */}
        <Box
          width={`${bookThick}rem`}
          height="100%"
          transform={`translateX(-${bookThick / 2}rem) rotateY(90deg)`}
          bgColor={data[0]}
        />
        {/* 책 윗면 스타일링 */}
        <Box
          width="100%"
          height={`${bookThick}rem`}
          transform={`translateY(-${bookThick / 2}rem) rotateX(90deg)`}
          bgColor="white.600"
        />
        {/* 책 표지 스타일링 */}
        <Image
          width={256}
          height={256}
          src={src}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            transform: `translateZ(${bookThick / 2}rem)`,
            // 책 그림자 추가할 것.
          }}
        />
      </Box>
    </Flex>
  );
};

export default InteractiveBookArticle;
