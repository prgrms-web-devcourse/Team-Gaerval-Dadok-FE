import { APIGroup } from '@/types/group';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import GroupListItem from '../Group/GroupList/GroupListItem';

interface ProfileMeetingProps {
  bookGroups: APIGroup[];
}

const ProfileMeeting = ({ bookGroups }: ProfileMeetingProps) => {
  return (
    <VStack w="100%">
      <Text alignSelf="flex-start" fontSize="md" fontWeight="bold">
        내가 참여한 모임
      </Text>
      <Box w="100%" overflow="auto">
        <Flex>
          {bookGroups.map(meeting => (
            <Box key={meeting.bookGroupId} w="95%" flex="1 0 auto" px="0.3rem">
              <GroupListItem {...meeting} />
            </Box>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
};

export default ProfileMeeting;
