'use client';

import { Flex } from '@chakra-ui/react';

import MeetingDetail from '@/ui/MeetingDetail';
import IconButton from '@/ui/common/IconButton';

const MeetingDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);
  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <IconButton name="back" />
      <MeetingDetail bookGroupId={Number(id)} />
    </Flex>
  );
};

export default MeetingDetailPage;
