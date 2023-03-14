import { APIMeetingGroup } from '@/types/meeting';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import MeetingListItem from '../Meeting/MeetingList/MeetingListItem';

interface ProfileMeetingProps {
  bookGroups: APIMeetingGroup[];
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
              <MeetingListItem {...meeting} />
            </Box>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
};

export default ProfileMeeting;
