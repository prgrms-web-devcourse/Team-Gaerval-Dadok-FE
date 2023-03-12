'use client';

import { Flex } from '@chakra-ui/react';

import TopNavigation from '@/ui/common/TopNavigation';
import MeetingDetail from '@/ui/MeetingDetail';

const MeetingDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <TopNavigation pageTitle="모임 상세 페이지" />
      <Flex px="5%" direction="column" justify="center" mt="1rem">
        <MeetingDetail bookGroupId={Number(id)} />
      </Flex>
    </>
  );
};

export default MeetingDetailPage;
