import { VStack } from '@chakra-ui/react';
import ProfileForm from '@/ui/Profile/ProfileForm';
import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import TopNavigation from '@/ui/common/TopNavigation';
import AuthRequired from '@/ui/AuthRequired';
import { useAuth } from '@/hooks/auth';

const EditMyPage = () => {
  const { isAuthed } = useAuth();

  const allJobQuery = useAllJobQuery({ enabled: isAuthed });
  const userProfileQuery = useMyProfileQuery({ enabled: isAuthed });

  const isSuccess = allJobQuery.isSuccess && userProfileQuery.isSuccess;

  return (
    <AuthRequired>
      <VStack justify="center" align="center">
        <TopNavigation pageTitle="내 프로필 수정" />
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

export default EditMyPage;
