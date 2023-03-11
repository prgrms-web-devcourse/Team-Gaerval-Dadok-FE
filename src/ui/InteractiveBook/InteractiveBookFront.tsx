import { APIBook } from '@/types/book';
import { Image } from '@chakra-ui/react';

const InteractiveBookFront = ({ imageUrl }: Pick<APIBook, 'imageUrl'>) => {
  return (
    <Image
      width="100%"
      height="100%"
      src={imageUrl}
      alt=""
      boxShadow="1px 1px 1px 1px #eee"
    />
  );
};

export default InteractiveBookFront;
