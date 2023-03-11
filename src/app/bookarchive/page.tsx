'use client';

import { useAuth } from '@/hooks/auth';
import { BookArchiveForUnAuth } from '@/ui/BookArchive';
import { VStack } from '@chakra-ui/react';

export default function BookArchive() {
  const { isAuthed } = useAuth();

  return (
    <VStack as="main" width="100%" spacing="2rem">
      {isAuthed ? (
        // 'TODO: 로그인한 유저 책장 추천 api 연결하기.'
        'TODO: 로그인한 유저 책장 추천 api 연결하기.'
      ) : (
        <BookArchiveForUnAuth />
      )}
    </VStack>
  );
}
