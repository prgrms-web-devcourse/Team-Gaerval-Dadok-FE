import { MouseEvent, useState } from 'react';
import {
  Input,
  VStack,
  InputGroup,
  Image,
  Text,
  SimpleGrid,
  Center,
} from '@chakra-ui/react';

import { APIBook } from '@/types/book';
import bookAPI from '@/apis/book';
import debounce from '@/utils/debounce';
import LogoSmallIcon from '@public/icons/logo_sm.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BookSearchProps {
  onBookClick?: (book: APIBook) => void;
}

const BookSearch = ({ onBookClick }: BookSearchProps) => {
  const [books, setBooks] = useState<APIBook[]>([]);
  const pathname = usePathname();

  const onInputChange = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      const {
        data: { searchBookResponseList },
      } = await bookAPI.getBooks({ query });
      setBooks(searchBookResponseList);
    },
    1000
  );

  const onClick = (book: APIBook) => (event: MouseEvent) => {
    if (!onBookClick) return;

    onBookClick(book);
    event.preventDefault();
  };

  return (
    <VStack w="100%">
      <InputGroup size="lg">
        <Input py="2rem" onChange={onInputChange} placeholder="책 검색" />
      </InputGroup>
      <SimpleGrid columns={3} gap="1rem">
        {books.map(book => (
          <Link key={book.isbn} href={`${pathname}/${book.isbn}`}>
            <VStack
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
          </Link>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default BookSearch;