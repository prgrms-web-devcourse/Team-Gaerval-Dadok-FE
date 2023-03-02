/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import {
  Box,
  Input,
  Flex,
  Image,
  Button,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';

import SearchedBook from './SearchedBook';

const SearchingBook = () => {
  const DummyData = [
    {
      id: 292929,
      imageURL: 'https://image.yes24.com/goods/102124327/L',
      title: '이펙티브 타입스크립트',
    },
    {
      id: 34345,
      imageURL: 'https://image.yes24.com/goods/11681152/L',
      title: 'Clean Code',
    },
    {
      id: 292439,
      imageURL: 'https://image.yes24.com/goods/24259565/L',
      title: 'Java의 정석',
    },
    {
      id: 242439,
      imageURL: 'https://image.yes24.com/goods/78586788/L',
      title: '코어 자바스크립트',
    },
    {
      id: 2252439,
      imageURL: 'https://image.yes24.com/goods/108887922/L',
      title: '면접을 위한 CS 전공지식 노트',
    },
    {
      id: 345555345,
      imageURL: 'https://image.yes24.com/goods/115852769/L',
      title: '개발자 원칙',
    },
    {
      id: 29445442439,
      imageURL: 'https://image.yes24.com/goods/112028850/L',
      title: '머신러닝&딥러닝',
    },
    {
      id: 2422222439,
      imageURL: 'https://image.yes24.com/goods/79378905/L',
      title: '개발자의 글쓰기',
    },
    {
      id: 225444449,
      imageURL: 'https://image.yes24.com/goods/17926925/L',
      title: '유지보수하기 어렵게 코딩하는 방법',
    },
  ];

  const [searchValue, setSearchValue] = useState('');
  const [searchedBook, setSearchedBook] = useState([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };

  const handleSubmit = (event?: React.FormEvent<HTMLDivElement>) => {
    event && event.preventDefault();
    /* submit 이벤트 발생시 검색 API 호출 및 searchedBook에 할당*/
    setSearchedBook([]);
    console.log(searchedBook);
  };

  return (
    /* bottom Sheet 높이는 maxWidth 지정 후 변경 예정 */
    <VStack px="2rem" h="90vh">
      <Flex h="10rem" fontSize="lg" align="center" mt="2rem">
        <Box as="span" color="main">
          책
        </Box>
        을 선택해 주세요
      </Flex>
      <Flex justify="center" as="form" onSubmit={handleSubmit}>
        <Flex mb="3rem">
          <Input
            placeholder="책 검색"
            h="3.5rem"
            value={searchValue}
            onChange={handleChange}
            borderTopRightRadius="none"
            borderBottomRightRadius="none"
            borderRight="none"
          />
          <Button
            type="submit"
            bgColor="white"
            cursor="pointer"
            h="3.5rem"
            border="solid 1px"
            borderColor="white.600"
            borderLeft="none"
            borderTopLeftRadius="none"
            borderBottomLeftRadius="none"
          >
            <Image src="/icons/bookIcon.svg" alt="bookIcon" />
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={[2, null, 3]} spacing="2rem" overflowY="scroll">
        {DummyData.map(book => (
          <SearchedBook
            key={book.id}
            imageURL={book.imageURL}
            title={book.title}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default SearchingBook;
