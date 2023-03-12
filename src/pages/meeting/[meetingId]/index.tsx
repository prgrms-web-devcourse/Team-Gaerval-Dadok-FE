import { Flex } from '@chakra-ui/react';

import TopNavigation from '@/ui/common/TopNavigation';
import MeetingDetail from '@/ui/MeetingDetail';
import { GetServerSideProps } from 'next';

const MeetingDetailPage = ({ meetingId }: { meetingId: number }) => {
  return (
    <>
      <TopNavigation pageTitle="모임 상세 페이지" />
      <Flex direction="column" justify="center" mt="1rem">
        <MeetingDetail bookGroupId={Number(meetingId)} />
      </Flex>
    </>
  );
};

export default MeetingDetailPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { meetingId } = context.query;

  return {
    props: {
      meetingId: Number(meetingId),
    },
  };
};
