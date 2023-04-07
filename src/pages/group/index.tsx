import useEntireGroupsQuery from '@/queries/group/useEntireGroupsQuery';
import GroupHeader from '@/ui/Group/GroupHeader';
import GroupList from '@/ui/Group/GroupList';
import GroupSearch from '@/ui/Group/GroupSearch';
import { Box, Skeleton, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

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
  const { ref, inView } = useInView();

  const {
    isSuccess,
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEntireGroupsQuery();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

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
        {isSuccess &&
          data.pages.map((groups, idx) => {
            return <GroupList key={idx} bookGroups={groups.bookGroups} />;
          })}
      </Box>
      <Box ref={ref} />
      {isFetchingNextPage && <Skeleton w="100%" height="28rem" />}
    </VStack>
  );
};

export default GroupPage;
