'use client';

import { Flex, Heading, VStack, Highlight } from '@chakra-ui/react';

import IconButton from '@/ui/common/IconButton';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import InteractiveBook from '@/ui/InteractiveBook';
import BookList from '@/ui/BookList';
import { DUMMY_BOOKS } from '@/pages/api/dummyBooks';

export default function BookArchive() {
  return (
    <VStack as="main" width="100%" p="2rem" spacing="2rem" mb="9rem">
      <IconButton name="search" alignSelf="flex-end" margin="1rem" />

      <Flex direction="column" width="100%" gap="3rem">
        <VStack align="flex-start" spacing="1rem">
          <Heading>
            <Highlight query="토비" styles={{ color: 'main' }}>
              토비님의 책장
            </Highlight>
          </Heading>
          <InteractiveBookShelf>
            {DUMMY_BOOKS.map((book, idx) => {
              if (idx >= 4) return;
              return <InteractiveBook key={book.id} src={book.src} />;
            })}
          </InteractiveBookShelf>
        </VStack>
        <VStack align="flex-start" spacing="1rem">
          <Heading>
            <Highlight query="웅모" styles={{ color: 'main' }}>
              웅모님의 책장
            </Highlight>
          </Heading>
          <InteractiveBookShelf>
            {DUMMY_BOOKS.map((book, idx) => {
              if (idx >= 4) return;
              return <InteractiveBook key={book.id} src={book.src} />;
            })}
          </InteractiveBookShelf>
        </VStack>
      </Flex>

      <BookList title="개발자가 많이 꽂은 책들이에요" />

      <Flex direction="column" width="100%" gap="3rem">
        <VStack align="flex-start" spacing="1rem">
          <Heading>
            <Highlight query="토비" styles={{ color: 'main' }}>
              토비님의 책장
            </Highlight>
          </Heading>
          <InteractiveBookShelf>
            {DUMMY_BOOKS.map((book, idx) => {
              if (idx >= 4) return;
              return <InteractiveBook key={book.id} src={book.src} />;
            })}
          </InteractiveBookShelf>
        </VStack>
        <VStack align="flex-start" spacing="1rem">
          <Heading>
            <Highlight query="웅모" styles={{ color: 'main' }}>
              웅모님의 책장
            </Highlight>
          </Heading>
          <InteractiveBookShelf>
            {DUMMY_BOOKS.map((book, idx) => {
              if (idx >= 4) return;
              return <InteractiveBook key={book.id} src={book.src} />;
            })}
          </InteractiveBookShelf>
        </VStack>
      </Flex>
    </VStack>
  );
}
