import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import type { APIUser } from '@/types/user';
import IconButton from '../../common/IconButton';

type ProfileInfoProps = Pick<APIUser, 'nickname' | 'profileImage' | 'job'>;

// COMMENT: 프로필 정보 조회 API 스키마 변경으로 email, oauthnickname props 제거
const ProfileInfoPresenter = ({
  nickname,
  profileImage,
  job: { jobGroupKoreanName, jobNameKoreanName },
}: ProfileInfoProps) => {
  return (
    <VStack align="flex-start" gap="1rem" w="100%">
      <Flex width="100%" gap="1.5rem">
        <Avatar src={profileImage} w="8rem" h="8rem" />
        <Flex direction="column" justify="center">
          <Text fontSize="xl">{nickname}</Text>
          {/* <Text fontSize="sm">{email}</Text> */}
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

export default ProfileInfoPresenter;
