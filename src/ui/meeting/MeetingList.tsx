import { Box, Flex, List, Image } from '@chakra-ui/react';

const MeetingList = () => {
  const dummyData = [
    {
      title: '제목제목제1313133131목제목제',
      content:
        '용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용용내용내용내용내용내용내용내용내용내용내용내용내용내',
      id: 1,
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
      id: 2,
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
      id: 2,
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
      id: 2,
      avatar: 'https://bit.ly/dan-abramov',
      nickName: '도마뱀꼬리는재생',
      people: 423,
      comments: 423,
      bookImage: '중국',
    },
  ];

  return (
    <List className="모임리스트">
      <Box>
        {dummyData.map(meeting => {
          return (
            <Flex
              key={meeting.id}
              m="0.8rem 0"
              w="100%"
              h="19rem"
              justify="space-between"
              backgroundColor="white"
              borderRadius="1rem"
              border="1px solid black"
            >
              <Flex p="1.5rem">
                <Box className="모임전체정보" w="65%">
                  <Box className="제목내용" h="70%">
                    <Box
                      className="제목"
                      w="100%"
                      h="25%"
                      fontSize="1.8rem"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                    >
                      {meeting.title}
                    </Box>
                    <Box
                      className="내용"
                      h="75%"
                      fontSize="1.4rem"
                      lineHeight="1.5"
                      overflow="hidden"
                    >
                      {meeting.content}
                    </Box>
                  </Box>
                  <Flex pt="1rem">
                    <Image
                      borderRadius="full"
                      boxSize="3rem"
                      src={meeting.avatar}
                      alt="Dan Abramov"
                    />
                    <Flex
                      className="모임정보"
                      direction="column"
                      w="80%"
                      ml="1rem"
                    >
                      <Box className="닉네임">{meeting.nickName}</Box>
                      <Flex className="댓글인원정보">
                        <Flex className="인원정보" w="4rem" align="center">
                          <Box>
                            <Image
                              src="/icons/peopleIcon.svg"
                              alt="peopleIcon"
                            />
                          </Box>
                          <Box className="사람수" w="3rem" ml="0.5rem">
                            {meeting.people}
                          </Box>
                        </Flex>
                        <Flex
                          className="댓글정보"
                          w="4rem"
                          align="center"
                          ml="0.5rem"
                        >
                          <Box>
                            <Image
                              src="/icons/commentIcon.svg"
                              alt="bookCover"
                            />
                          </Box>
                          <Box className="댓글수" w="3rem" ml="0.5rem">
                            {meeting.comments}
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
                <Flex w="35%" justify="center" align="center">
                  <Image
                    src="http://image.yes24.com/goods/101865885/XL"
                    alt="bookCover"
                    w="10rem"
                    objectFit="cover"
                  />
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Box>
    </List>
  );
};

export default MeetingList;
