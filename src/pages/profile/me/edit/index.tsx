import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import AuthRequired from '@/ui/AuthRequired';
import TopNavigation from '@/ui/common/TopNavigation';
import ProfileForm from '@/ui/Profile/ProfileForm';
import { isAuthed } from '@/utils/helpers';
import { VStack } from '@chakra-ui/react';

const EditMyPage = () => {
  const allJobQuery = useAllJobQuery({ enabled: isAuthed() });
  const userProfileQuery = useMyProfileQuery({ enabled: isAuthed() });

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
