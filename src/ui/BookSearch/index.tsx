import {
  Box,
  Flex,
  Input,
  InputGroup,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import type { APIBook } from '@/types/book';
import useBookSearchQuery from '@/queries/book/useBookSearchQuery';
import useRecentSearchesQuery from '@/queries/book/useRecentSearchesQuery';
import { useInView } from 'react-intersection-observer';
import useDebounceValue from '@/hooks/useDebounce';
import SearchedBook from './SearchedBook';
import RecentSearches from './RecentSearches';

const TEMP_SEARCHES_DATA = [
  '정의',
  '사랑',
  '추억',
  '계란후라이',
  '으라챠챠',
  '우당탕탕',
  '미유커피',
  '마이마이쮸',
  '하이',
  '나루토',
  '보루토',
  '스미마셍',
  '노인과 바다',
];

interface BookSearchProps {
  onBookClick?: (bookId: APIBook) => void;
}

const BookSearch = ({ onBookClick }: BookSearchProps) => {
  const [inputValue, setInputValue] = useState('');
  const queryKeyword = useDebounceValue(inputValue, 1000);

  const { ref, inView } = useInView();

  const { data, isSuccess, isFetching, hasNextPage, fetchNextPage } =
    useBookSearchQuery({
      query: queryKeyword,
      page: 1,
      pageSize: 12,
    });

  //로그인, 비로그인 어떤 식으로 요청이 오고 가는 것인지?
  //헤더에 토큰을 담지 않은 경우에 알아서 로그인 유저인지 비로그인 유저인지 구별할 수 있는 것인가?
  //검색어 post API가 별도로 있는 것인지?
  const recentSearches = useRecentSearchesQuery();
  console.log(recentSearches.data);
  console.log(recentSearches.isError);
  console.log(recentSearches.isSuccess);

  const searchedBooks = isSuccess
    ? data.pages.flatMap(page => page.searchBookResponseList)
    : [];

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    const input = event.target.value;
    setInputValue(input.trim());
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  return (
    <VStack w="100%">
      <InputGroup display="flex" flexDirection="column" gap="2rem" size="lg">
        <Text
          alignSelf="flex-start"
          fontSize="2rem"
          fontWeight="800"
          color="main"
        >
          Discover
        </Text>
        <Input
          focusBorderColor="main"
          value={inputValue}
          borderColor="black.600"
          borderWidth="0.12rem"
          py="2rem"
          onChange={onInputChange}
          placeholder="검색어를 입력해 주세요."
        />
      </InputGroup>
      <RecentSearches
        searchedWords={TEMP_SEARCHES_DATA}
        setKeyword={setInputValue}
      />

      <SimpleGrid columns={3} gap="1rem">
        {searchedBooks.map(book => (
          <SearchedBook key={book.isbn} book={book} onBookClick={onBookClick} />
        ))}
      </SimpleGrid>

      {isFetching && (
        <Flex gap="1rem" w="100%">
          <Skeleton w="100%" h="18rem" borderRadius={10} />
          <Skeleton w="100%" h="18rem" borderRadius={10} />
          <Skeleton w="100%" h="18rem" borderRadius={10} />
        </Flex>
      )}
      <Box ref={ref} />
    </VStack>
  );
};

export default BookSearch;
