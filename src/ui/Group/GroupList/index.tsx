import { Box, List } from '@chakra-ui/react';

import { APIGroup } from '@/types/group';
import GroupListItem from './GroupListItem';

const GroupList = ({ bookGroups }: { bookGroups: APIGroup[] }) => {
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
