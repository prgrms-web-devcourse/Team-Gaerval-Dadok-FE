'use client';

import { Flex, Heading, Highlight, VStack } from '@chakra-ui/react';

import { DUMMY_BOOKS } from '@/pages/api/dummyBooks';
import BookList from '@/ui/BookList';
import IconButton from '@/ui/common/IconButton';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';

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
          <InteractiveBookShelf bookList={DUMMY_BOOKS} />
        </VStack>
        <VStack align="flex-start" spacing="1rem">
          <Heading>
            <Highlight query="웅모" styles={{ color: 'main' }}>
              웅모님의 책장
            </Highlight>
          </Heading>
          <InteractiveBookShelf bookList={DUMMY_BOOKS} />
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
          <InteractiveBookShelf bookList={DUMMY_BOOKS} />
        </VStack>
        <VStack align="flex-start" spacing="1rem">
          <Heading>
            <Highlight query="웅모" styles={{ color: 'main' }}>
              웅모님의 책장
            </Highlight>
          </Heading>
          <InteractiveBookShelf bookList={DUMMY_BOOKS} />
        </VStack>
      </Flex>
    </VStack>
  );
}
