'use client';

import { Flex, Box, useTheme } from '@chakra-ui/react';
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
    <Flex direction="column" justify="center" gap="1rem" py="4rem" px="2rem">
      <Flex width="100%" gap="1rem">
        <UserAvatar
          src={profileImage}
          name={nickName}
          // TODO: API 받으면 사용자의 프로필 페이지로 이동하도록 구현
          href="/mypage"
          w="6rem"
          h="6rem"
        />
        <Flex direction="column" justify="center">
          <Box fontSize={theme.size.lg}>{nickName}</Box>
          <Box fontSize={theme.size.sm}>{email}</Box>
        </Flex>
      </Flex>
      <Box>
        <Box fontSize={theme.size.sm}>직군 / 직업</Box>
        <Box fontSize={theme.size.md}>{job}</Box>
      </Box>
      <Box>
        <Box fontSize={theme.size.sm}>내 책장</Box>
        <Box fontSize={theme.size.md}>책장이 비어있습니다.</Box>
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
      >
        프로필 수정
      </Box>
    </Flex>
  );
};

export default MyPage;
