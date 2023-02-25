'use client';

import { Flex, Box, useTheme, Text } from '@chakra-ui/react';
import UserAvatar from '@/ui/UserAvatar';
import Link from 'next/link';

const User = {
  nickName: '다독이',
  profileImage: 'https://avatars.githubusercontent.com/u/48359052?v=4',
  email: 'minjongbaek@gmail.com',
  job: 'IT/프론트엔드 개발자',
};

const MyPage = () => {
  const { nickName, profileImage, email, job } = User;

  const theme = useTheme();

  return (
    <Flex direction="column" justify="center" gap="2rem" py="4rem" px="2rem">
      <Flex width="100%" gap="1.5rem">
        <UserAvatar
          src={profileImage}
          name={nickName}
          // TODO: API 받으면 사용자의 프로필 페이지로 이동하도록 구현
          href="/mypage"
          w="8rem"
          h="8rem"
        />
        <Flex direction="column" justify="center">
          <Text fontSize="xl">{nickName}</Text>
          <Text fontSize="sm">{email}</Text>
        </Flex>
      </Flex>
      <Box>
        <Text fontSize="sm">직군 / 직업</Text>
        <Text fontSize="md">{job}</Text>
      </Box>
      <Box>
        <Text fontSize="sm">내 책장</Text>
        <Text fontSize="md">책장이 비어있습니다.</Text>
      </Box>
      <Box
        as={Link}
        href="mypage/edit"
        px="2rem"
        py="1rem"
        color={theme.colors.main}
        border="1px solid"
        borderRadius="5rem"
        textAlign="center"
        fontSize="md"
      >
        프로필 수정
      </Box>
    </Flex>
  );
};

export default MyPage;
