import { APIBook } from '@/types/book';
import { Box, Flex, Image } from '@chakra-ui/react';
import { usePalette } from 'color-thief-react';
import Link from 'next/link';

const BOOK_WIDTH = '8.5rem';
const BOOK_HEIGHT = '11rem';
const BOOK_COVER_WIDTH = '3rem';

const InteractiveBook = ({
  imageUrl,
  bookId,
}: Pick<APIBook, 'imageUrl' | 'bookId'>) => {
  const { data } = usePalette(
    '/api/book/image?' + new URLSearchParams({ url: imageUrl }),
    2,
    'hex'
  );

  return (
    <Flex style={{ perspective: '200px' }} justify="center" flexGrow={1}>
      {data && (
        <Box
          as={Link}
          href={`/book/${bookId}`}
          w={BOOK_WIDTH}
          h={BOOK_HEIGHT}
          transform="rotateY(30deg) translateX(1rem)"
          boxSizing="border-box"
          style={{
            perspectiveOrigin: 'center center',
            transformStyle: 'preserve-3d',
          }}
        >
          <Box
            w={BOOK_WIDTH}
            h="1rem"
            pos="absolute"
            bottom={0}
            transform="translateZ(-3rem)"
            boxShadow="1px -4px 20px 3px"
          ></Box>
          <Image
            width="4rem"
            src={imageUrl}
            pos="absolute"
            alt="book cover"
            w="100%"
            h="100%"
          />
          <Box
            w={BOOK_COVER_WIDTH}
            h="100%"
            bgColor={data[0]}
            transform="rotateY(-90deg) translateX(-1.49rem) translateZ(1.5rem)"
          ></Box>
        </Box>
      )}
    </Flex>
  );
};

export default InteractiveBook;
