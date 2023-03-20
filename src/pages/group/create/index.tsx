import AddGroupForm from '@/ui/Group/AddGroupForm';
import { VStack } from '@chakra-ui/react';
import TopNavigation from '@/ui/common/TopNavigation';
import AuthRequired from '@/ui/AuthRequired';

const GroupCreatePage = () => {
  return (
    <AuthRequired>
      <VStack justify="center" align="center">
        <TopNavigation pageTitle="모임 생성" />
        <AddGroupForm />
      </VStack>
    </AuthRequired>
  );
};

export default GroupCreatePage;
