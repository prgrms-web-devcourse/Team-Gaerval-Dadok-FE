import { Box } from '@chakra-ui/react';

interface BookSideTypes {
  bookColor: string;
  bookThick: number;
}

const InteractiveBookSide = ({ bookColor, bookThick }: BookSideTypes) => {
  return (
    <Box
      width={`${bookThick}rem`}
      height="100%"
      transform={`translateX(-${bookThick / 2}rem) rotateY(90deg)`}
      bgColor={bookColor}
    />
  );
};

export default InteractiveBookSide;
