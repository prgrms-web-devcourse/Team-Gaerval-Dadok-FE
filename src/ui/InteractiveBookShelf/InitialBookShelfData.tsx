import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import InteractiveBook from '../InteractiveBook';

const initialBookImageUrl = [
  '/images/book-cover/book1.jpeg',
  '/images/book-cover/book2.jpeg',
  '/images/book-cover/book3.jpeg',
  '/images/book-cover/book4.jpeg',
] as const;

const InitialBookShelfData = () => {
  return (
    <Flex
      w="100%"
      direction="column"
      position="relative"
      height="15.2rem"
      justify="flex-end"
      gap="2rem"
    >
      <Box
        position="absolute"
        width="100%"
        bottom="0"
        bgColor="white.500"
        height="4rem"
        borderBottomRadius={10}
      />
      <SimpleGrid
        columns={4}
        width="100%"
        height="15.2rem"
        shadow="md"
        alignItems="center"
        borderRadius={10}
        boxShadow="inset 0px 0px 20px 2px #9595956e"
        px="1rem"
      >
        {initialBookImageUrl.map((imageUrl, idx) => (
          <InteractiveBook key={idx} bookId={null} imageUrl={imageUrl} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default InitialBookShelfData;
