import { Input, Select, Button, Image, Flex } from '@chakra-ui/react';

const MeetingSearch = () => {
  return (
    <Flex as="form" m="1rem 0" boxShadow="default">
      <Select
        w="14rem"
        h="3.5rem"
        borderRightRadius="none"
        borderRight="none"
        variant="filled"
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
