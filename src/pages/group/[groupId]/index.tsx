import { Flex } from '@chakra-ui/react';

import GroupDetail from '@/ui/Group/GroupDetail';
import { GetServerSideProps } from 'next';

const GroupDetailPage = ({ groupId }: { groupId: number }) => {
  return (
    <Flex direction="column" justify="center">
      <GroupDetail bookGroupId={Number(groupId)} />
    </Flex>
  );
};

export default GroupDetailPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { groupId } = context.query;

  return {
    props: {
      groupId: Number(groupId),
    },
  };
};
