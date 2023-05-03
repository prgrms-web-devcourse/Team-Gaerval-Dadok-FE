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

interface BookSearchProps {
  onBookClick?: (bookId: APIBook) => void;
}

const BookSearch = ({ onBookClick }: BookSearchProps) => {
  const [inputValue, setInputValue] = useState('');
  const queryKeyword = useDebounceValue(inputValue, 1000);

  const { ref, inView } = useInView();

  const bookSearchInfo = useBookSearchQuery({
    query: queryKeyword,
    page: 1,
    pageSize: 12,
  });

  const recentSearchesInfo = useRecentSearchesQuery();

  const searchedBooks = bookSearchInfo.isSuccess
    ? bookSearchInfo.data.pages.flatMap(page => page.searchBookResponseList)
    : [];

  const recentSearches = recentSearchesInfo.isSuccess
    ? recentSearchesInfo.data.bookRecentSearchResponses
    : undefined;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    const input = event.target.value;
    setInputValue(input.trim());
  };

  useEffect(() => {
    if (inView && bookSearchInfo.hasNextPage) {
      bookSearchInfo.fetchNextPage();
    }
    recentSearchesInfo.refetch();
  }, [
    bookSearchInfo.fetchNextPage,
    inView,
    bookSearchInfo.hasNextPage,
    queryKeyword,
    bookSearchInfo,
    recentSearchesInfo,
  ]);

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
        searchedWords={recentSearches}
        setKeyword={setInputValue}
      />

      <SimpleGrid columns={3} gap="1rem">
        {searchedBooks.map(book => (
          <SearchedBook key={book.isbn} book={book} onBookClick={onBookClick} />
        ))}
      </SimpleGrid>

      {bookSearchInfo.isFetching && (
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
