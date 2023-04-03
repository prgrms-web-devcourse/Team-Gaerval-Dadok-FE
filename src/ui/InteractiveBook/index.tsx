import { APIBook } from '@/types/book';
import { Box, Flex, Image } from '@chakra-ui/react';
import { usePalette } from 'color-thief-react';
import Link from 'next/link';

const InteractiveBook = ({
  imageUrl,
  bookId,
}: Pick<APIBook, 'imageUrl' | 'bookId'>) => {
  const { data: colors } = usePalette(
    '/api/book/image?' + new URLSearchParams({ url: imageUrl }),
    2,
    'hex'
  );

  return (
    <Flex style={{ perspective: '200px' }} justify="center" flexGrow={1}>
      {colors && (
        <Box
          as={Link}
          href={`/book/${bookId}`}
          w="8.5rem"
          h="11rem"
          transform="rotateY(30deg) translateX(1rem)"
          boxSizing="border-box"
          style={{
            perspectiveOrigin: 'center center',
            transformStyle: 'preserve-3d',
          }}
        >
          <Box
            w="100%"
            h="1rem"
            pos="absolute"
            bottom={0}
            transform={`translateZ(-3rem)`}
            boxShadow="1px -4px 20px 3px"
          />
          <Image
            src={imageUrl}
            pos="absolute"
            alt="book cover"
            w="100%"
            h="100%"
          />
          <Box
            w="3rem"
            h="100%"
            bgColor={colors[0]}
            transform="rotateY(-90deg) translateX(-1.49rem) translateZ(1.5rem)"
          />
        </Box>
      )}
    </Flex>
  );
};

export default InteractiveBook;
