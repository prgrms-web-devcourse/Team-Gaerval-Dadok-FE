import useEntireMeetingListQuery from '@/queries/meeting/useEntireMeetingListQuery';
import GroupHeader from '@/ui/Group/GroupHeader';
import GroupList from '@/ui/Group/GroupList';
import GroupSearch from '@/ui/Group/GroupSearch';

import { Box, Skeleton, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface SearchValue {
  [key: string]: string;
  input: string;
  select: string;
}

const GroupPage = () => {
  const [searchValue, setSearchValue] = useState<SearchValue>({
    input: '',
    select: '모임',
  });

  const { isSuccess, data, isLoading } = useEntireMeetingListQuery();

  const handleSumbit = () => {
    const { input } = searchValue;
    if (input.trim().length === 0) {
      /*공백만 입력한 경우 전체 데이터 렌더링 */
    } else {
      /*검색 API호출 및 setMeetingListData 업데이트 */
    }
  };

  const handleChange = (name: string, value: string) => {
    if (!(name in searchValue)) return;
    const tempSearchValue = { ...searchValue };
    tempSearchValue[name] = value;
    setSearchValue(tempSearchValue);
  };

  if (isLoading)
    return (
      <VStack gap="0.5rem" align="stretch" w="100%">
        <Skeleton height="9rem" />
        <Skeleton height="28rem" />
        <Skeleton height="28rem" />
        <Skeleton height="28rem" />
      </VStack>
    );

  return (
    <VStack align="center">
      <Box w="100%">
        <GroupHeader />
        <GroupSearch
          searchValue={searchValue}
          handleChange={handleChange}
          handleSumbit={handleSumbit}
        />
        {isSuccess && <GroupList bookGroups={data.bookGroups} />}
      </Box>
    </VStack>
  );
};

export default GroupPage;
