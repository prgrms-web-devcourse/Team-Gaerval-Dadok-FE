import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Input,
  VStack,
  InputGroup,
  Image,
  Text,
  SimpleGrid,
  Center,
  Flex,
} from '@chakra-ui/react';

import bookAPI from '@/apis/book';
import debounce from '@/utils/debounce';
import LogoSmallIcon from '@public/icons/logo_sm.svg';

import type { APIBook } from '@/types/book';

interface BookSearchProps {
  onBookClick?: (bookId: APIBook) => void;
}

const BookSearch = ({ onBookClick }: BookSearchProps) => {
  const [books, setBooks] = useState<APIBook[]>([]);

  const router = useRouter();

  const onInputChange = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      if (!query.trim()) return;
      const {
        data: { searchBookResponseList },
      } = await bookAPI.getBooks({ query });
      setBooks(searchBookResponseList);
    },
    1000
  );

  const onClick = (book: APIBook) => async (event: MouseEvent) => {
    try {
      const {
        data: { bookId },
      } = await bookAPI.createBook({ book });
      if (onBookClick) {
        onBookClick({ ...book, bookId });
        event.preventDefault();
      } else {
        router.push(`/book/${bookId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack w="100%">
      <InputGroup display="flex" flexDirection="column" gap="1rem" size="lg">
        <Flex align="center">
          <Image width="2.7rem" src="/icons/book.svg" alt="sreachIcon" />
          <Text fontSize="lg" fontWeight="700" pl="0.5rem">
            도서 검색
          </Text>
        </Flex>
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
        {books.map(book => (
          <VStack
            key={book.isbn}
            w="100%"
            minH="18rem"
            h="100%"
            justify="center"
            fontSize="sm"
            bgColor="white"
            p="1rem"
            borderRadius={10}
            boxShadow="lg"
            cursor="pointer"
            onClick={onClick(book)}
          >
            {book.imageUrl ? (
              <Image src={book.imageUrl} alt="book-cover" />
            ) : (
              <Center bgColor="white" w="100%" h="100%">
                <LogoSmallIcon />
              </Center>
            )}
            <Text
              w="100%"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              textAlign="center"
              fontSize="sm"
            >
              {book.title}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default BookSearch;
