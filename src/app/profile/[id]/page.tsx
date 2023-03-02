'use client';

import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useUserProfileQuery from '@/queries/user/useUserProfileQuery';

interface ProfilePageProps {
  params: { id: number | string };
}

const ProfilePage = ({ params }: ProfilePageProps) => {
  const { id } = params;
  const pathname = usePathname();

  const userProfileQuery = useUserProfileQuery({ id });

  if (userProfileQuery.isSuccess) {
    const { nickname, profileImage, email, job } = userProfileQuery.data;
    return (
      <Flex direction="column" justify="center" gap="2rem" pt="4rem" px="2rem">
        <Flex width="100%" gap="1.5rem">
          <Avatar
            src={profileImage}
            name={nickname}
            // TODO: API 받으면 사용자의 프로필 페이지로 이동하도록 구현
            w="8rem"
            h="8rem"
          />
          <Flex direction="column" justify="center">
            <Text fontSize="xl">{nickname}</Text>
            <Text fontSize="sm">{email}</Text>
          </Flex>
        </Flex>
        {job && (
          <Box>
            <Text fontSize="sm">직군 / 직업</Text>
            <Text fontSize="md">
              {`${job.jobGroupKoreanName} / ${job.jobName}`}
            </Text>
          </Box>
        )}
        <Box>
          <Text fontSize="sm">내 책장</Text>
          <Text fontSize="md">책장이 비어있습니다.</Text>
        </Box>
        {id === 'me' && (
          <Box
            as={Link}
            href={`${pathname}/edit`}
            px="2rem"
            py="1rem"
            color="main"
            border="1px solid"
            borderRadius="5rem"
            textAlign="center"
            fontSize="md"
          >
            프로필 수정
          </Box>
        )}
      </Flex>
    );
  }

  return null;
};

export default ProfilePage;
