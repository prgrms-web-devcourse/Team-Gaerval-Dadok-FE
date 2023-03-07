import { useState } from 'react';
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

const BookSearch = () => {
  const [books, setBooks] = useState<APIBook[]>([]);

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

  return (
    <VStack w="100%">
      <InputGroup size="lg">
        <Input py="2rem" onChange={onInputChange} placeholder="책 검색" />
      </InputGroup>
      <SimpleGrid columns={3} gap="1rem">
        {books.map(({ isbn, title, imageUrl }) => (
          <VStack
            w="100%"
            justify="center"
            key={isbn}
            fontSize="sm"
            bgColor="white"
            p="1rem"
            borderRadius={10}
          >
            {imageUrl ? (
              <Image src={imageUrl} alt="book-cover" />
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
              {title}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default BookSearch;
