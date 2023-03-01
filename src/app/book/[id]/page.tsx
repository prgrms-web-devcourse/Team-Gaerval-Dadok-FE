'use client';

import TopNavigation from '@/ui/common/TopNavigation';
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

const BookDetailPage = () => {
  const toast = useToast({
    render: () => <Box bg='main' p='1.5rem' fontSize="md" color="white" borderRadius={10} mb='10rem' fontWeight='bold' textAlign='center'>책장에 책이 꽂혔어요.</Box>,
  });

  return (
    <Box w="100%" pl="2rem" pt="2rem">
      <TopNavigation pageTitle="" />
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
            <Box
              as="button"
              px="1rem"
              py="0.3rem"
              color="main"
              border="1px solid"
              borderRadius="5rem"
              fontSize="sm"
              ml="-1"
              onClick={() =>
                toast({
                  title: '책장에 꽂혔어요.',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                })
              }
            >
              책장에 꽂기
            </Box>
            <Text fontSize="lg" fontWeight="bold">
            쏙쏙 들어오는 함수형 코딩
            </Text>
            <Text fontSize="sm">에릭 노먼드</Text>
            <Text fontSize="sm" fontWeight="bold" color="main">
              3.5 / 5
            </Text>
          </VStack>
        </Flex>
        <Text fontSize="md">
        함수형 프로그래밍은 절차적 프로그래밍, 객체 지향 프로그래밍과는 다른 새로운 방식의 프로그래밍이다. 따라서 함수형 프로그래밍을 배운다는 것은 새로운 방식으로 사고하는 방법을 배우는 것이다. 그렇다면 함수형 개발자는 어떤 방식으로 생각하고 소프트웨어를 만들까. 이 책은 함수형 프로그래밍의 가장 기본이 되는 부수 효과를 다루는 방법으로 시작한다.
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
