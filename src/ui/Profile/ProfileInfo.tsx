import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react';
import type { APIUser } from '@/types/user';

interface ProfileInfoProps
  extends Pick<
    APIUser,
    'nickname' | 'oauthNickname' | 'profileImage' | 'email' | 'job'
  > {
  children?: React.ReactNode;
}

const ProfileInfo = ({
  nickname,
  oauthNickname,
  profileImage,
  email,
  job: { jobGroupKoreanName, jobNameKoreanName },
  children,
}: ProfileInfoProps) => {
  return (
    <VStack align="flex-start" gap="0.5rem" w="100%">
      <Flex width="100%" gap="1.5rem">
        <Avatar src={profileImage} w="8rem" h="8rem" />
        <Flex direction="column" justify="center">
          <Text fontSize="xl">{nickname || oauthNickname}</Text>
          <Text fontSize="sm">{email}</Text>
        </Flex>
      </Flex>
      <Box>
        <Text fontSize="sm">직군 / 직업</Text>
        <Text fontSize="md">
          {jobGroupKoreanName && jobNameKoreanName
            ? `${jobGroupKoreanName} / ${jobNameKoreanName}`
            : '직업이 등록되지 않았습니다.'}
        </Text>
      </Box>
      {children}
    </VStack>
  );
};

export default ProfileInfo;
