import { Box } from '@chakra-ui/react';

interface BookTopTypes {
  bookThick: number;
}

const InteractiveBookTop = ({ bookThick }: BookTopTypes) => {
  return (
    <Box
      width="100%"
      height={`${bookThick}rem`}
      transform={`rotateX(-90deg)`}
      bgColor="#f9f9f9"
      border="1px #ddd solid"
    />
  );
};

export default InteractiveBookTop;
