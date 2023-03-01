'use client';

import Goback from '@/ui/GoBack';
import { Avatar, AvatarGroup, Box, Flex, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

const BookDetailPage = () => {
  return (
    <Box w="100%">
      <Goback />
      <VStack
        bgColor="white"
        ml="2rem"
        p="2rem"
        shadow="lg"
        align="stretch"
        borderLeftRadius={15}
        gap="2rem"
      >
        <Flex gap="2rem" align="flex-end">
          <Box shadow="lg">
            <Image
              src="/images/img_functionalBook.png"
              alt="book"
              width={180}
              height={240}
            />
          </Box>
          <VStack align="flex-start">
            <Text fontSize="lg" fontWeight="bold">
              챗 GPT(마침내 찾아온 특이점)
            </Text>
            <Text fontSize="sm">백민종</Text>
            <Text fontSize="sm" fontWeight="bold" color="main">
              3.5 / 5
            </Text>
          </VStack>
        </Flex>
        <Text fontSize="md">
          챗 GPT 어쩌구 저쩌구 이러쿵 저러쿵 이래라 저래라 엘엘레 얼래벌래, 챗
          GPT 어쩌구 저쩌구 이러쿵 저러쿵 이래라 저래라 엘엘레 얼래벌래, 챗 GPT
          어쩌구 저쩌구 이러쿵 저러쿵 이래라 저래라 엘엘레 얼래벌래, 챗 GPT
          어쩌구 저쩌구 이러쿵 저러쿵 이래라 저래라 엘엘레 얼래벌래
        </Text>
        <Flex align="center" gap="0.8rem">
          <AvatarGroup max={2}>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
          </AvatarGroup>
          <Text fontSize="sm">외 3명이 이 책을 책장에 꽂았습니다.</Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default BookDetailPage;
