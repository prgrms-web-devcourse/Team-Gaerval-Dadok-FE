import { Image } from '@chakra-ui/react';
interface BookFrontTypes {
  src: string;
}

const InteractiveBookFront = ({ src }: BookFrontTypes) => {
  return <Image width="100%" height="100%" src={src} alt="" shadow="lg" />;
};

export default InteractiveBookFront;
