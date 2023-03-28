import GroupAPI from '@/apis/group';
import { APIGroupDetail } from '@/types/group';
import AuthRequired from '@/ui/AuthRequired';
import TopNavigation from '@/ui/common/TopNavigation';
import EditGroupForm from '@/ui/Group/EditGroupForm';
import { VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useCallback, useEffect, useState } from 'react';

const GroupEditPage = ({ groupId }: { groupId: number }) => {
  const [group, setGroup] = useState<APIGroupDetail>();

  const getGroup = useCallback(async () => {
    try {
      const { data } = await GroupAPI.getGroupDetailInfo({
        bookGroupId: groupId,
      });
      setGroup(data);
    } catch (error) {
      console.error(error);
    }
  }, [groupId]);

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  return (
    <AuthRequired>
      <VStack justify="center" align="center">
        <TopNavigation pageTitle="모임 수정" />
        {group && <EditGroupForm group={group} />}
      </VStack>
    </AuthRequired>
  );
};

export default GroupEditPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { groupId } = context.query;

  return {
    props: {
      groupId: Number(groupId),
    },
  };
};
