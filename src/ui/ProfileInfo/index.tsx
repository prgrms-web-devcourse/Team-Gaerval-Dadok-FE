import { APIUser } from '@/types/user';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

const ProfileInfo = ({
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

export default ProfileInfo;
