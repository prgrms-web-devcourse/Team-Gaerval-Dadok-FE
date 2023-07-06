import { Flex, Text, VStack } from '@chakra-ui/react';

interface searchedWordsProps {
  keyword: string;
  modifiedAt: string;
}
interface RecentSearchesProps {
  searchedWords?: searchedWordsProps[];
  setKeyword: (searchedWord: string) => void;
}

const RecentSearches = ({ searchedWords, setKeyword }: RecentSearchesProps) => {
  return (
    <VStack width="100%" alignItems="stretch">
      <Text fontSize="lg" color="black" my="1rem">
        최근 검색어
      </Text>
      {searchedWords ? (
        <Flex width="100%" gap="1rem" overflowX="scroll" pb="2rem">
          {searchedWords.map(({ keyword, modifiedAt }) => {
            return (
              <Text
                key={modifiedAt}
                whiteSpace="nowrap"
                fontSize="sm"
                color="yellow.900"
                p="0.8rem 1.6rem 0.6rem"
                borderRadius="2.8rem"
                bgColor="yellow.200"
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
