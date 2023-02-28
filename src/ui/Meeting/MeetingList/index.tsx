import { Box, Flex, List, Image, Text, Avatar } from '@chakra-ui/react';
import Link from 'next/link';

const MeetingList = () => {
  const dummyData = [
    {
      title: '제목제목제1313133131목제목제',
      content:
        '용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내',
      id: 234,
      avatar: 'https://bit.ly/dan-abramov',
      nickName: '아라한장풍',
      people: 1,
      comments: 1,
      bookImage: '대한민국',
    },
    {
      title: 'CSS',
      content:
        '하지만 위의 예제처럼 적용이 되지 않아 한참을 헤매였다. 항상 이유를 찾다보면 몇글자가 달라서이다🥲display 속성이 blcok 이어야 text-overflow 속성이 잘 동작한다는 것이다. 텍스트는 보통 <span> 이나 <p> 태그에 잘 쓴다. 얘네들은 inline 요소다. 그렇기 떄문에 속성 지정을 block 으로 변경해주고 나서야 비로소 잘 동작하게 되었다.',
      id: 2525,
      avatar: 'https://bit.ly/dan-abramov',
      nickName: '잠실동쭈꾸미',
      people: 22,
      comments: 23,
      bookImage: '일본',
    },
    {
      title: '제목제목목제목제목',
      content:
        '용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용',
      id: 7575,
      avatar: 'https://bit.ly/dan-abramov',
      nickName: '응모아조씨',
      people: 3233,
      comments: 3233,
      bookImage: '미국',
    },
    {
      title: '모던 자바스크립트 딥다이브',
      content:
        '용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내',
      id: 90,
      avatar: 'https://bit.ly/dan-abramov',
      nickName: '도마뱀꼬리는재생',
      people: 423,
      comments: 423,
      bookImage: '중국',
    },
  ];

  return (
    <List>
      <Box>
        {dummyData.map(meeting => {
          return (
            <Box key={meeting.id}>
              <Link href={`/meeting/${meeting.id}`}>
                <Flex
                  m="0.8rem 0"
                  w="100%"
                  h="19rem"
                  justify="space-between"
                  backgroundColor="white"
                  borderRadius="1rem"
                  p="1.5rem"
                  _hover={{ bgColor: '#FFFDFA' }}
                  boxShadow="default"
                >
                  <Box w="65%">
                    <Box h="70%">
                      <Text
                        w="100%"
                        h="25%"
                        fontSize="1.8rem"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        _hover={{ textDecor: 'underLine' }}
                      >
                        {meeting.title}
                      </Text>
                      <Text
                        h="75%"
                        fontSize="1.4rem"
                        lineHeight="1.5"
                        overflow="hidden"
                        _hover={{ textDecor: 'underLine' }}
                      >
                        {meeting.content}
                      </Text>
                    </Box>
                    <Flex pt="1rem">
                      <Avatar src={meeting.avatar} loading="lazy" />
                      <Flex direction="column" w="80%" ml="1rem">
                        <Box>{meeting.nickName}</Box>
                        <Flex>
                          <Flex w="4rem" align="center">
                            <Box>
                              <Image
                                src="/icons/peopleIcon.svg"
                                alt="peopleIcon"
                              />
                            </Box>
                            <Box w="3rem" ml="0.5rem">
                              {meeting.people}
                            </Box>
                          </Flex>
                          <Flex w="4rem" align="center" ml="0.5rem">
                            <Box>
                              <Image
                                src="/icons/commentIcon.svg"
                                alt="bookCover"
                              />
                            </Box>
                            <Box w="3rem" ml="0.5rem">
                              {meeting.comments}
                            </Box>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                  <Flex w="35%" justify="center" align="center" pl="1rem">
                    <Image
                      src="http://image.yes24.com/goods/101865885/XL"
                      alt="bookCover"
                      w="10rem"
                      objectFit="cover"
                      boxShadow="default"
                      borderRadius="0.5rem"
                    />
                  </Flex>
                </Flex>
              </Link>
            </Box>
          );
        })}
      </Box>
    </List>
  );
};

export default MeetingList;
