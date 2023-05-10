import { Flex, Text, VStack } from '@chakra-ui/react';

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
    <VStack width="100%" alignItems="stretch">
      <Text fontSize="lg" color="black" my="1rem">
        최근 검색어
      </Text>
      {searchedWords ? (
        <Flex width="100%" gap="1rem" overflowX="scroll" pb="3rem">
          {searchedWords.map(({ keyword, createdAt }) => {
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
        <Text mb="1.5rem" fontSize="sm" color="black.700" alignSelf="center">
          검색 기록이 없어요.
        </Text>
      )}
    </VStack>
  );
};

export default RecentSearches;
