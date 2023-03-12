import { useState } from 'react';

import useEntireMeetingListQuery from '@/queries/meeting/useEntireMeetingListQuery';
import MeetingListHeader from './MeetingListHeader';
import MeetingSearch from './MeetingSearch';
import MeetingList from './MeetingList';
import { Box } from '@chakra-ui/react';

interface SearchValue {
  [key: string]: string;
  input: string;
  select: string;
}

const MeetingPageContainer = () => {
  const [searchValue, setSearchValue] = useState<SearchValue>({
    input: '',
    select: '모임',
  });

  const { isSuccess, data } = useEntireMeetingListQuery();

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
      <MeetingListHeader />
      <MeetingSearch
        searchValue={searchValue}
        handleChange={handleChange}
        handleSumbit={handleSumbit}
      />
      {isSuccess && <MeetingList bookGroups={data.bookGroups} />}
    </Box>
  );
};

export default MeetingPageContainer;
