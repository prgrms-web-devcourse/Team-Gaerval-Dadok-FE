import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  Select,
  Flex,
  InputRightElement,
  IconButton,
  InputGroup,
} from '@chakra-ui/react';

interface SearchValue {
  input: string;
  select: string;
}
interface GroupSearchProps {
  searchValue: SearchValue;
  handleChange: (name: string, value: string) => void;
  handleSumbit: () => void;
}

const GroupSearch = ({
  searchValue,
  handleChange,
  handleSumbit,
}: GroupSearchProps) => {
  const { input, select } = searchValue;

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event && event.preventDefault();
    handleSumbit();
  };

  return (
    <Flex
      as="form"
      m="1rem 0"
      w="100%"
      onSubmit={handleSubmit}
      borderRadius="1rem"
      boxShadow="default"
    >
      <Select
        w="14rem"
        h="3.5rem"
        borderRightRadius="none"
        borderLeftRadius="1rem"
        borderRight="none"
        variant="filled"
        onChange={event => handleChange('select', event.target.value)}
        value={select}
      >
        <option value="모임">모임</option>
        <option value="책 제목">책 제목</option>
      </Select>
      <InputGroup>
        <Input
          borderRightRadius="1rem"
          borderLeftRadius="none"
          h="3.5rem"
          background="white"
          border="none"
          placeholder="검색어를 입력해 주세요."
          onChange={event => handleChange('input', event.target.value)}
          value={input}
        />
        <InputRightElement>
          <IconButton
            m="1rem 0.6rem 0 0"
            bgColor="white"
            borderRightRadius="1rem"
            h="3.5rem"
            aria-label="Search database"
            icon={<SearchIcon />}
            type="submit"
            size="lg"
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default GroupSearch;
