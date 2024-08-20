'use client';

import { Flex } from '@chakra-ui/react';

import GroupDetail from '@/ui/Group/GroupDetail';

const GroupDetailPage = ({
  params: { groupId },
}: {
  params: { groupId: number };
}) => {
  return (
    <Flex direction="column" justify="center">
      <GroupDetail bookGroupId={Number(groupId)} />
    </Flex>
  );
};

export default GroupDetailPage;
