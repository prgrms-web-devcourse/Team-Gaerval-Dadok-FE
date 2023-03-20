import { Box, List } from '@chakra-ui/react';

import { APIMeetingGroup } from '@/types/meeting';
import GroupListItem from './GroupListItem';

const GroupList = ({ bookGroups }: { bookGroups: APIMeetingGroup[] }) => {
  return (
    <List>
      <Box>
        {bookGroups.map(bookGroup => (
          <GroupListItem key={bookGroup.bookGroupId} {...bookGroup} />
        ))}
      </Box>
    </List>
  );
};

export default GroupList;
