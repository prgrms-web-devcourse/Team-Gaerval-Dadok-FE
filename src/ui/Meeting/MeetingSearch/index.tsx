import { useState } from 'react';
import { Input, Select, Button, Image, Flex } from '@chakra-ui/react';

interface setSearchValueProps {
  input: string;
  select: string;
}
interface MeetingSearchProps {
  setSearchValue: (arg0: setSearchValueProps) => void;
}

const MeetingSearch = ({ setSearchValue }: MeetingSearchProps) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('모임');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event && event.preventDefault();
    setSearchValue({
      input: inputValue,
      select: selectValue,
    });
  };

  return (
    <Flex as="form" m="1rem 0" boxShadow="default" onSubmit={handleSubmit}>
      <Select
        w="14rem"
        h="3.5rem"
        borderRightRadius="none"
        borderRight="none"
        variant="filled"
        onChange={handleSelectChange}
      >
        <option value="모임">모임</option>
        <option value="책 제목">책 제목</option>
      </Select>
      <Input
        borderRadius="none"
        h="3.5rem"
        background="white"
        border="none"
        placeholder="검색어를 입력해 주세요."
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        h="3.5rem"
        background="white"
        border="none"
        borderLeftRadius="none"
      >
        <Image src="/icons/search.svg" alt="검색버튼" />
      </Button>
    </Flex>
  );
};

export default MeetingSearch;
