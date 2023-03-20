import MeetingAPI from '@/apis/meeting';
import { APIMeetingDetail } from '@/types/meetingDetail';
import AuthRequired from '@/ui/AuthRequired';
import TopNavigation from '@/ui/common/TopNavigation';
import EditGroupForm from '@/ui/Group/EditGroupForm';
import { VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useCallback, useEffect, useState } from 'react';

const GroupEditPage = ({ groupId }: { groupId: number }) => {
  const [meeting, setMeeting] = useState<APIMeetingDetail>();

  const getMeeting = useCallback(async () => {
    try {
      const { data } = await MeetingAPI.getMeetingDetailInfo({
        bookGroupId: groupId,
      });
      setMeeting(data);
    } catch (error) {
      console.error(error);
    }
  }, [groupId]);

  useEffect(() => {
    getMeeting();
  }, [getMeeting]);

  return (
    <AuthRequired>
      <VStack justify="center" align="center">
        <TopNavigation pageTitle="모임 수정" />
        {meeting && <EditGroupForm meeting={meeting} />}
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
