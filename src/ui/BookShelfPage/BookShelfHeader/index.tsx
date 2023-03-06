'use client';

import { APIBookshelfInfo } from '@/types/bookshelf';
import { Flex, HStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import BookShelfTag from '../BookShelfTag';

type InfoTypes = {
  bookshelfInfo: APIBookshelfInfo;
};

const BookShelfHeader = ({ bookshelfInfo }: InfoTypes) => {
  const { userNickname, job } = bookshelfInfo;
  const { jobGroupKoreanName, jobNameKoreanName } = job;

  return (
    <Flex width="100%" justifyContent="flex-start">
      <Image
        width={24}
        height={24}
        alt="bookshelfIcon"
        src="/icons/bookshelf.svg"
      />
      <Text fontSize="lg" fontWeight="700" marginRight="0.4rem">
        {userNickname}님의 책장
      </Text>
      <HStack gap="0.08rem">
        <BookShelfTag tag={jobGroupKoreanName} />
        <BookShelfTag tag={jobNameKoreanName} />
      </HStack>
    </Flex>
  );
};

export default BookShelfHeader;
