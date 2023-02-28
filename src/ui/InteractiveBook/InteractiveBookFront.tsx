import Image from 'next/image';
import { useTheme } from '@chakra-ui/react';

interface BookFrontTypes {
  src: string;
  bookColor: string;
  bookThick: number;
}

const InteractiveBookFront = ({
  src,
  bookColor,
  bookThick,
}: BookFrontTypes) => {
  const theme = useTheme();

  return (
    <Image
      width={128}
      height={128}
      src={src}
      alt=""
      style={{
        width: '100%',
        height: '100%',
        filter: `drop-shadow(0.3rem 0.3rem 0.3rem ${theme.colors.white[600]})`,
        transform: `translateZ(${bookThick / 2}rem)`,
        backgroundColor: bookColor,
        // TODO: 책 그림자 추가할 것.
      }}
    />
  );
};

export default InteractiveBookFront;
