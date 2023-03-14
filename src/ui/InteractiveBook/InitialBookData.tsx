import { Box, Flex } from '@chakra-ui/react';
import InteractiveBookFront from './InteractiveBookFront';
import InteractiveBookSide from './InteractiveBookSide';
import InteractiveBookTop from './InteractiveBookTop';

const BOOK_WIDTH = 8.5;
const BOOK_HEIGHT = 11;
const BOOK_THICK = 2;

const InitialBookData = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Flex
      flexShrink={0}
      filter="auto"
      blur="0.6rem"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'translate3d(0,0,0)',
      }}
    >
      <Box
        sx={{
          width: `${BOOK_WIDTH}rem`,
          height: `${BOOK_HEIGHT}rem`,
          transformStyle: 'preserve-3d',
          transform: 'rotate3d(-12, 21, -4, 40deg) translateX(0.5rem)',

          '> div, img': {
            position: 'absolute',
            boxSizing: 'border-box',
            transformOrigin: 'top left',
          },
        }}
      >
        <InteractiveBookTop bookThick={BOOK_THICK} />
        <InteractiveBookSide bookColor="black.500" bookThick={BOOK_THICK} />
        <InteractiveBookFront imageUrl={imageUrl} />
      </Box>
    </Flex>
  );
};

export default InitialBookData;
