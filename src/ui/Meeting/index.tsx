'use client';

import { useState, ReactNode, Suspense } from 'react';

import useEntireMeetingListQuery from '@/queries/meeting/useEntireMeetingListQuery';
import MeetingListHeader from './MeetingListHeader';
import MeetingSearch from './MeetingSearch';
import MeetingList from './MeetingList';
import { Box, Skeleton, VStack } from '@chakra-ui/react';

interface SearchValue {
  [key: string]: string;
  input: string;
  select: string;
}

const MeetingPageContainer = () => {
  return (
    <MeetingPage>
      <Page />
    </MeetingPage>
  );
};

export default MeetingPageContainer;

const MeetingPage = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <MeetingListHeader />
      <Suspense
        fallback={
          <VStack gap="1rem" align="stretch">
            <Skeleton w="40rem" h="30rem" />
            <Skeleton w="40rem" h="30rem" />
            <Skeleton w="40rem" h="30rem" />
            <Skeleton w="40rem" h="30rem" />
          </VStack>
        }
      >
        {children}
      </Suspense>
    </Box>
  );
};

const Page = () => {
  const { data } = useEntireMeetingListQuery({ suspense: true });

  const [searchValue, setSearchValue] = useState<SearchValue>({
    input: '',
    select: '모임',
  });

  const handleSumbit = () => {
    console.log(searchValue);
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

  return (
    <Box>
      <MeetingSearch
        searchValue={searchValue}
        handleChange={handleChange}
        handleSumbit={handleSumbit}
      />
      {data && <MeetingList bookGroups={data.bookGroups} />}
    </Box>
  );
};
