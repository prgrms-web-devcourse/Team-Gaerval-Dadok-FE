import { Box, List } from '@chakra-ui/react';

import { APIMeetingGroup } from '@/types/meeting';
import MeetingListItem from './MeetingListItem';

const MeetingList = ({ bookGroups }: { bookGroups: APIMeetingGroup[] }) => {
  return (
    <List>
      <Box>
        {bookGroups.map(bookGroup => (
          <MeetingListItem key={bookGroup.bookGroupId} {...bookGroup} />
        ))}
      </Box>
    </List>
  );
};

export default MeetingList;
