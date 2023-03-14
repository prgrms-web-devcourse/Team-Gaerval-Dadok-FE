import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import type { APIUser } from '@/types/user';
import IconButton from '../common/IconButton';

type ProfileInfoProps = Pick<
  APIUser,
  'nickname' | 'oauthNickname' | 'profileImage' | 'email' | 'job'
>;

const ProfileInfo = ({
  nickname,
  oauthNickname,
  profileImage,
  email,
  job: { jobGroupKoreanName, jobNameKoreanName },
}: ProfileInfoProps) => {
  return (
    <VStack align="flex-start" gap="1rem" w="100%">
      <Flex width="100%" gap="1.5rem">
        <Avatar src={profileImage} w="8rem" h="8rem" />
        <Flex direction="column" justify="center">
          <Text fontSize="xl">{nickname || oauthNickname}</Text>
          <Text fontSize="sm">{email}</Text>
        </Flex>
      </Flex>
      <HStack>
        <IconButton name="job-card" strokeWidth="0.01px" fill />
        <Text fontSize="md" fontWeight="bold">
          {jobGroupKoreanName && jobNameKoreanName
            ? `${jobGroupKoreanName} / ${jobNameKoreanName}`
            : '직업이 등록되지 않았습니다.'}
        </Text>
      </HStack>
    </VStack>
  );
};

export default ProfileInfo;
