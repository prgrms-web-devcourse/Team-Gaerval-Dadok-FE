import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import AuthRequired from '@/ui/AuthRequired';
import ProfileForm from '@/ui/Profile/ProfileForm';
import { isAuthed } from '@/utils/helpers';
import { Text, VStack } from '@chakra-ui/react';

const AdditionalProfile = () => {
  const allJobQuery = useAllJobQuery({ enabled: isAuthed() });
  const userProfileQuery = useMyProfileQuery({ enabled: isAuthed() });

  const isSuccess = allJobQuery.isSuccess && userProfileQuery.isSuccess;

  return (
    <AuthRequired>
      <VStack position="relative" zIndex={10} pt="6rem" gap="1rem">
        <Text fontSize="lg" fontWeight="bold">
          추가 정보를 입력해 주세요!
        </Text>
        <Text fontSize="md" textAlign="center">
          추가 정보를 입력하면
          <br />
          <Text as="span" color="main" fontWeight="bold">
            다독다독
          </Text>
          이 추천하는 책장을 볼 수 있어요!
        </Text>
        {isSuccess && (
          <ProfileForm
            profile={userProfileQuery.data}
            jobGroups={allJobQuery.data.jobGroups}
          />
        )}
      </VStack>
    </AuthRequired>
  );
};

export default AdditionalProfile;
