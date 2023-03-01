import { Image, Text, VStack } from '@chakra-ui/react';

interface SearchedBookProps {
  imageURL: string;
  title: string;
}

const SearchedBook = ({ imageURL, title }: SearchedBookProps) => {
  return (
    <VStack w="14.6rem" h="18rem" px="2rem">
      <Image src={imageURL} alt="bookImage" w="100%" h="80%" />
      <Text
        fontSize="sm"
        textAlign="center"
        mt="0.5rem"
        w="100%"
        h="15%"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {title}
      </Text>
    </VStack>
  );
};

export default SearchedBook;
