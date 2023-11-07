import { APIBook } from '@/types/book';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ColorThief from 'colorthief';

import { useState } from 'react';

interface InteractiveBookProps {
  imageUrl: APIBook['imageUrl'];
  bookId: APIBook['bookId'] | null;
}

const InteractiveBook = ({ imageUrl, bookId }: InteractiveBookProps) => {
  const router = useRouter();
  const [bookSpineColor, setBookSpineColor] = useState<string>();

  const handleOnLoadImage = (image: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const colorHex =
      '#' +
      colorThief
        .getPalette(image, 2)[0]
        .map(x => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('');
    setBookSpineColor(colorHex);
  };

  const handleClickBook = () => {
    if (!bookId) return;
    router.push(`/book/${bookId}`);
  };

  return (
    <Flex
      style={{ perspective: '200px' }}
      justify="center"
      flexGrow={1}
      filter={bookId ? 'none' : 'auto'}
      blur={bookId ? 'none' : '0.2rem'}
      cursor={bookId ? 'pointer' : 'auto'}
    >
      <Box
        w="8.0rem"
        h="11rem"
        transform="rotateY(30deg) translateX(1rem)"
        boxSizing="border-box"
        style={{
          perspectiveOrigin: 'center center',
          transformStyle: 'preserve-3d',
        }}
        position="relative"
        visibility={!bookSpineColor ? 'hidden' : 'visible'}
        onClick={handleClickBook}
      >
        <Box
          w="100%"
          h="1rem"
          pos="absolute"
          bottom={0}
          transform={`translateZ(-2.5rem)`}
          boxShadow="1px -4px 20px 3px"
        />
        <Image
          src={imageUrl}
          alt="book cover"
          onLoadingComplete={handleOnLoadImage}
          fill
          sizes="256px"
          quality={100}
        />
        <Box
          w="2.5rem"
          h="100%"
          bgColor={bookSpineColor}
          transform="rotateY(-90deg) translateX(-1.49rem) translateZ(1.15rem)"
        />
      </Box>
    </Flex>
  );
};

export default InteractiveBook;
