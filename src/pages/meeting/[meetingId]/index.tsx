import { Flex } from '@chakra-ui/react';

import MeetingDetail from '@/ui/MeetingDetail';
import { GetServerSideProps } from 'next';

const MeetingDetailPage = ({ meetingId }: { meetingId: number }) => {
  return (
    <Flex direction="column" justify="center">
      <MeetingDetail bookGroupId={Number(meetingId)} />
    </Flex>
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
