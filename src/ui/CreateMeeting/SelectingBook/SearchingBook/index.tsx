'use client';
/* eslint-disable react/no-children-prop */
import SearchedBook from './SearchedBook';
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

const SearchingBook = () => {
  const DummyData = [
    {
      id: 292929,
      imageURL: 'https://image.yes24.com/goods/102347474/XL',
      title: '아무것도 없는 책책책책책책책책책책책책책책책책책책ㅍ',
    },
    {
      id: 34345,
      imageURL: 'https://image.yes24.com/Goods/117465944/L',
      title: '내추럴 와인메이커스',
    },
    {
      id: 292439,
      imageURL: 'https://image.yes24.com/Goods/117584402/L',
      title: '차를 담는 시간',
    },
    {
      id: 242439,
      imageURL: 'https://image.yes24.com/Goods/117459170/L',
      title: '조선사 스무고개',
    },
    {
      id: 2252439,
      imageURL: 'https://image.yes24.com/Goods/117292516/L',
      title: '배니시드',
    },
    {
      id: 345555345,
      imageURL: 'https://image.yes24.com/Goods/117465944/L',
      title: '내추럴 와인메이커스',
    },
    {
      id: 29445442439,
      imageURL: 'https://image.yes24.com/Goods/117584402/L',
      title: '차를 담는 시간',
    },
    {
      id: 2422222439,
      imageURL: 'https://image.yes24.com/Goods/117459170/L',
      title: '조선사 스무고개',
    },
    {
      id: 225444449,
      imageURL: 'https://image.yes24.com/Goods/117292516/L',
      title: '배니시드',
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
    console.log('submit');
  };

  return (
    /* bottom Sheet 높이는 maxWidth 지정 후 변경 예정 */
    <VStack px="2rem" h="50rem">
      <Flex h="10rem" fontSize="lg" align="center">
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
