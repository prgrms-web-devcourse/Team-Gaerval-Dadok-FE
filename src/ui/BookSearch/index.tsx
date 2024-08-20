import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { APIBook } from '@/types/book';
import useBookSearchQuery from '@/queries/book/useBookSearchQuery';
import useRecentSearchesQuery from '@/queries/book/useRecentSearchesQuery';
import useDebounceValue from '@/hooks/useDebounce';
import SearchedBook from './SearchedBook';
import RecentSearches from './RecentSearches';
import SearchIcon from '@public/icons/search.svg';
import { isAuthed } from '@/utils/helpers';

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

  const recentSearchesInfo = useRecentSearchesQuery({ enabled: isAuthed() });

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
    isAuthed() && recentSearchesInfo.refetch();
  }, [
    bookSearchInfo.fetchNextPage,
    inView,
    bookSearchInfo.hasNextPage,
    queryKeyword,
    bookSearchInfo,
    recentSearchesInfo,
  ]);

  return (
    <VStack w="100%" gap="2rem">
      <InputGroup>
        <InputLeftElement top="0.8rem">
          <Box w="1.8rem" h="1.8rem">
            <SearchIcon />
          </Box>
        </InputLeftElement>
        <Input
          variant="flushed"
          borderColor="black.500"
          focusBorderColor="main"
          fontSize="lg"
          p="2rem 4rem"
          value={inputValue}
          onChange={onInputChange}
          placeholder="책 제목, 작가를 검색해보세요"
          _placeholder={{ color: 'black.500' }}
        />
      </InputGroup>

      {!inputValue && (
        <RecentSearches
          searchedWords={recentSearches}
          setKeyword={setInputValue}
        />
      )}

      {inputValue && (
        <SimpleGrid columns={3} gap="1rem">
          {searchedBooks.map((book, index) => (
            <SearchedBook
              key={`${book.isbn}-${index}`} // API 데이터에 겹치는 isbn이 존재하여 임시 생성한 키
              book={book}
              onBookClick={onBookClick}
            />
          ))}
        </SimpleGrid>
      )}

      {inputValue && bookSearchInfo.isFetching && (
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
