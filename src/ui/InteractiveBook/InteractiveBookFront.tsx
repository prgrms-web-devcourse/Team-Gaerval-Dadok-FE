import { Image } from '@chakra-ui/react';
interface BookFrontTypes {
  src: string;
  bookColor: string;
  bookThick: number;
}

const InteractiveBookFront = ({ src, bookColor }: BookFrontTypes) => {
  console.log(src)
  return (
    <Image
      width="100%"
      height="100%"
      src={src}
      alt=""
      backgroundColor={bookColor}
      shadow="lg"
    />
  );
};

export default InteractiveBookFront;
