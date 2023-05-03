import { Flex, Text, Box } from '@chakra-ui/react';

interface searchedWordsProps {
  keyword: string;
  createdAt: string;
}
interface RecentSearchesProps {
  searchedWords: searchedWordsProps[] | undefined;
  setKeyword: (searchedWord: string) => void;
}

const RecentSearches = ({ searchedWords, setKeyword }: RecentSearchesProps) => {
  return (
    <>
      <Box width="100%" fontSize="sm" color="black.700">
        <Text my="1rem">최근 검색어</Text>
      </Box>
      {searchedWords ? (
        <Flex width="100%" gap="1rem" overflowX="scroll" pb="3rem">
          {searchedWords &&
            searchedWords.map(searchedWord => {
              const { keyword, createdAt } = searchedWord;

              return (
                <Text
                  key={createdAt}
                  whiteSpace="nowrap"
                  fontSize="md"
                  mr="0.5rem"
                  px="1.5rem"
                  borderRadius="1.5rem"
                  bgColor="white.700"
                  onClick={() => {
                    setKeyword(keyword);
                  }}
                  cursor="pointer"
                >
                  {keyword}
                </Text>
              );
            })}
        </Flex>
      ) : (
        <Box fontSize="sm" color="black.600">
          <Text mb="1.5rem">검색 기록이 없습니다.</Text>
        </Box>
      )}
    </>
  );
};

export default RecentSearches;
