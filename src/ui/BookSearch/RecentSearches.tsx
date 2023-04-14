import { Flex, Text } from '@chakra-ui/react';

interface RecentSearchesProps {
  searchedWords: string[];
  setKeyword: (searchedWord: string) => void;
}

const RecentSearches = ({ searchedWords, setKeyword }: RecentSearchesProps) => {
  return (
    <Flex width="100%" gap="1rem" overflowX="scroll" pt="1rem" pb="3rem">
      {searchedWords &&
        searchedWords.map(searchedWord => {
          return (
            <Text
              key={searchedWord}
              whiteSpace="nowrap"
              fontSize="md"
              mr="0.5rem"
              px="1.5rem"
              borderRadius="1.5rem"
              bgColor="white.700"
              onClick={() => {
                setKeyword(searchedWord);
              }}
            >
              {searchedWord}
            </Text>
          );
        })}
    </Flex>
  );
};

export default RecentSearches;
