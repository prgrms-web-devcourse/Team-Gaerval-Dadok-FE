'use client';

import { Flex, HStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import UsersBookShelfTag from './UsersBookShelfTag';

const DUMMY_USER = {
  userName: '벌레',
  tags: ['개발', '프론트엔드'],
};

const UsersBookShelfHeader = () => {
  return (
    <Flex width="100%" justifyContent="flex-start">
      <Image
        width={24}
        height={24}
        alt="bookshelfIcon"
        src="/icons/bookshelf.svg"
      />
      <Text fontSize="lg" fontWeight="700" marginRight="0.4rem">
        {DUMMY_USER.userName}님의 책장
      </Text>
      <HStack gap="0.08rem">
        {DUMMY_USER.tags.map((tag, idx) => (
          <UsersBookShelfTag key={idx} tag={tag} />
        ))}
      </HStack>
    </Flex>
  );
};

export default UsersBookShelfHeader;
