import { Flex, Heading, VStack, Text, Image } from '@chakra-ui/react';
import { RECOMMENDED_BOOKS } from '@/pages/api/dummyBooks';

interface Props {
  title?: string;
}

const BookList = ({ title }: Props) => {
  return (
    <Flex
      width="100%"
      direction="column"
      gap="1rem"
      style={{ padding: '2rem 0' }}
    >
      <Heading>{title}</Heading>
      <Flex gap="1rem" overflowX="scroll">
        {RECOMMENDED_BOOKS.map(({ id, imageURL, title }) => (
          <VStack direction="column" key={id} minWidth="11rem">
            <Image
              src={imageURL}
              alt="bookImage"
              width="100%"
              height="80%"
              objectFit="cover"
              borderRadius="1rem"
            />
            <Text
              fontSize="md"
              textAlign="center"
              width="100%"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {title}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Flex>
  );
};

export default BookList;
