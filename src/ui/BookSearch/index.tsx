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

import debounce from '@/utils/debounce';

import type { APIBook } from '@/types/book';
import useBookSearchQuery from '@/queries/book/useBookSearchQuery';
import SearchedBook from './SearchedBook';
import { useInView } from 'react-intersection-observer';

interface BookSearchProps {
  onBookClick?: (bookId: APIBook) => void;
}

const BookSearch = ({ onBookClick }: BookSearchProps) => {
  const [keyword, setKeyword] = useState('');
  const { ref, inView } = useInView();

  const { data, isSuccess, isFetching, hasNextPage, fetchNextPage } =
    useBookSearchQuery({
      query: keyword,
      page: 1,
      pageSize: 12,
    });

  const searchedBooks = isSuccess
    ? data.pages.flatMap(page => page.searchBookResponseList)
    : [];

  const onInputChange = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target) return;
      const keyword = event.target.value;
      if (!keyword.trim()) return;
      setKeyword(keyword);
    },
    1000
  );

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
          borderColor="black.600"
          borderWidth="0.12rem"
          py="2rem"
          onChange={onInputChange}
          placeholder="검색어를 입력해 주세요."
        />
      </InputGroup>

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
