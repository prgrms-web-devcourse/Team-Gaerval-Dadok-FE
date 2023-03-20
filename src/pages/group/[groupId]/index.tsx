import { Flex } from '@chakra-ui/react';

import MeetingDetail from '@/ui/MeetingDetail';
import { GetServerSideProps } from 'next';

const GroupDetailPage = ({ groupId }: { groupId: number }) => {
  return (
    <Flex direction="column" justify="center">
      <MeetingDetail bookGroupId={Number(groupId)} />
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
