'use client';
import { Box, Flex, Button, List } from '@chakra-ui/react';

const Meeting = () => {
  const dummyData = [
    {
      title: '제목',
      content:
        '용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용',
      id: 1,
      avatar: '아바타',
      nickName: '닉네임',
      people: 123,
      comments: 123,
      bookImage: '대한민국',
    },
    {
      title: '제목',
      content:
        '용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용',
      id: 2,
      avatar: '아바타',
      nickName: '닉네임',
      people: 223,
      comments: 223,
      bookImage: '일본',
    },
    {
      title: '제목',
      content:
        '용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용',
      id: 2,
      avatar: '아바타',
      nickName: '닉네임',
      people: 323,
      comments: 323,
      bookImage: '미국',
    },
    {
      title: '제목',
      content:
        '용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용',
      id: 2,
      avatar: '아바타',
      nickName: '닉네임',
      people: 423,
      comments: 423,
      bookImage: '중국',
    },
  ];

  return (
    <Flex justify="center">
      <Flex mt="30px" w="90%" direction="column">
        <Box>
          <Flex>
            <Box w={'80%'} fontSize="2rem">
              독서 모임
            </Box>
            <Flex justify="center" align="center" w="20%">
              <Button fontSize="1.3rem">모임 만들기</Button>
            </Flex>
          </Flex>
        </Box>
        <Box className="모임리스트">
          <List>
            {dummyData.map(meeting => {
              return (
                <Flex
                  key={meeting.id}
                  m="0.8rem 0"
                  w="100%"
                  h="100%"
                  justify="space-between"
                  border="1px solid blue"
                >
                  <Box className="모임전체정보" w="65%">
                    <Box className="제목내용" h="70%" p="1.5rem">
                      <Box className="제목" h="30%" fontSize="2rem">
                        {meeting.title}
                      </Box>
                      <Box className="내용" fontSize="1.3rem">
                        {meeting.content}
                      </Box>
                    </Box>
                    <Flex p="1.5rem 1.5rem 1.5rem 1.5rem">
                      <Box className="아바타" w="20%">
                        {meeting.avatar}
                      </Box>
                      <Flex className="모임정보" direction="column" w="80%">
                        <Box className="닉네임">{meeting.nickName}</Box>
                        <Flex className="댓글인원정보">
                          <Flex className="인원정보">
                            <Box className="사람아이콘">{'아이콘'}</Box>
                            <Box className="사람수">{meeting.people}</Box>
                          </Flex>
                          <Flex className="댓글정보">
                            <Box className="댓글아이콘">{'아이콘'}</Box>
                            <Box className="댓글수">{meeting.comments}</Box>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                  <Box className="책이미지" w="35%">
                    {meeting.bookImage}
                  </Box>
                </Flex>
              );
            })}
          </List>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Meeting;
