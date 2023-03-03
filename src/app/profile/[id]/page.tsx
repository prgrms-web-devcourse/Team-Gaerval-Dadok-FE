'use client';

import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useUserProfileQuery from '@/queries/user/useUserProfileQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { APIUser } from '@/types/user';
import { ReactNode } from 'react';

interface ProfilePageProps {
  params: { id: number | 'me' };
}

const ProfilePage = ({ params }: ProfilePageProps) => {
  const { id } = params;

  return id === 'me' ? <MyProfile /> : <UserProfile id={id} />;
};

const MyProfile = () => {
  const userProfileQuery = useMyProfileQuery();
  const pathname = usePathname();

  if (userProfileQuery.isSuccess) {
    return (
      <Template user={userProfileQuery.data}>
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
      </Template>
    );
  }

  return null;
};

const UserProfile = ({ id }: { id: APIUser['userId'] }) => {
  const userProfileQuery = useUserProfileQuery({ id });

  if (userProfileQuery.isSuccess) {
    return <Template user={userProfileQuery.data} />;
  }

  return null;
};

const Template = ({
  user,
  children,
}: {
  user: APIUser;
  children?: ReactNode;
}) => {
  const { nickname, profileImage, email, job } = user;
  const { jobGroupKoreanName, jobName } = job;
  return (
    <Flex direction="column" justify="center" gap="2rem" pt="4rem" px="2rem">
      <Flex width="100%" gap="1.5rem">
        <Avatar src={profileImage} name={nickname} w="8rem" h="8rem" />
        <Flex direction="column" justify="center">
          <Text fontSize="xl">{nickname}</Text>
          <Text fontSize="sm">{email}</Text>
        </Flex>
      </Flex>
      <Box>
        <Text fontSize="sm">직군 / 직업</Text>
        <Text fontSize="md">
          {jobGroupKoreanName && jobName
            ? `${job.jobGroupKoreanName} / ${job.jobName}`
            : '직업이 등록되지 않았습니다.'}
        </Text>
      </Box>
      <Box>
        <Text fontSize="sm">내 책장</Text>
        <Text fontSize="md">책장이 비어있습니다.</Text>
      </Box>
      {children}
    </Flex>
  );
};

export default ProfilePage;
