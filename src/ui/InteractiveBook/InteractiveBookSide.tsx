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
      transform={`rotateY(90deg)`}
      bgColor={bookColor}
      // CORS 대안
      // backgroundImage={src}
      // backgroundSize="100000%"
      // backgroundPosition="top left"
    />
  );
};

export default InteractiveBookSide;
