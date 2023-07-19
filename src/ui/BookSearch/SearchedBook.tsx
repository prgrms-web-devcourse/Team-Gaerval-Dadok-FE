import bookAPI from '@/apis/book';
import { APISearchedBook, APIBook } from '@/types/book';
import { Center, Image, Text, VStack } from '@chakra-ui/react';

import LogoSmallIcon from '@public/icons/logo-small.svg';
import { useRouter } from 'next/navigation';

const SearchedBook = ({
  book,
  onBookClick,
}: {
  book: APISearchedBook;
  onBookClick?: (book: APIBook) => void;
}) => {
  const router = useRouter();

  const handleClickBook = async (book: APISearchedBook) => {
    try {
      const {
        data: { bookId },
      } = await bookAPI.createBook({ book });
      if (onBookClick) {
        onBookClick({ ...book, bookId });
      } else {
        router.push(`/book/${bookId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack
      key={book.isbn}
      w="100%"
      minH="18rem"
      justify="center"
      fontSize="sm"
      bgColor="white"
      p="1rem"
      borderRadius={10}
      boxShadow="lg"
      cursor="pointer"
      onClick={() => handleClickBook(book)}
    >
      {book.imageUrl ? (
        <Image src={book.imageUrl} alt="book-cover" />
      ) : (
        <Center bgColor="white" w="100%">
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
  );
};

export default SearchedBook;
