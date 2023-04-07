import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import InteractiveBook from '../InteractiveBook';

const initialBookImageUrl = [
  'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5056576%3Ftimestamp%3D20221108010740',
  'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5477653%3Ftimestamp%3D20221107233622',
  'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5736428%3Ftimestamp%3D20221107223347',
  'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5326912%3Ftimestamp%3D20221231221935',
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
        {initialBookImageUrl.map((url, idx) => (
          <InteractiveBook
            key={idx}
            bookId={idx}
            imageUrl={url}
            filter="auto"
            blur="0.2rem"
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default InitialBookShelfData;
