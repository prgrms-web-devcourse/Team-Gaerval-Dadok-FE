import { Flex, Text, Box } from '@chakra-ui/react';

interface RecentSearchesProps {
  searchedWords: string[];
  setKeyword: (searchedWord: string) => void;
}

const RecentSearches = ({ searchedWords, setKeyword }: RecentSearchesProps) => {
  return (
    <>
      <Box width="100%" fontSize="sm" color="black.700">
        <Text my="1rem">최근 검색어</Text>
      </Box>
      <Flex width="100%" gap="1rem" overflowX="scroll" pb="3rem">
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
    </>
  );
};

export default RecentSearches;
