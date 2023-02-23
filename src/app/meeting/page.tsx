'use client';
import { Box, Flex, Button, List, ListItem } from '@chakra-ui/react';

const Meeting = () => {
  const dummyData = [
    {
      title: '일',
      content: '일일일일일일일일',
      id: 1,
      avatar: '아바타',
      nickName: '닉네임',
      people: 123,
      comments: 123,
      bookImage: '대한민국',
    },
    {
      title: '이',
      content: '이이이이이이',
      id: 2,
      avatar: '아바타',
      nickName: '닉네임',
      people: 223,
      comments: 223,
      bookImage: '일본',
    },
    {
      title: '삼',
      content: '삼삼삼삼삼삼',
      id: 2,
      avatar: '아바타',
      nickName: '닉네임',
      people: 323,
      comments: 323,
      bookImage: '미국',
    },
    {
      title: '사',
      content: '사사사사사사',
      id: 2,
      avatar: '아바타',
      nickName: '닉네임',
      people: 423,
      comments: 423,
      bookImage: '중국',
    },
  ];

  return (
    <Flex direction="column" border={'1px'}>
      <Flex>
        <Box>독서 모임</Box>
        <Button>모임 만들기</Button>
      </Flex>
      <Box className="모임리스트">
        <List>
          {dummyData.map(meeting => {
            return (
              <ListItem key={meeting.id}>
                <Box className="모임전체정보">
                  <Box className="제목내용">
                    <Box className="제목">{meeting.title}</Box>
                    <Box className="내용">{meeting.content}</Box>
                  </Box>
                  <Box className="방장및모임정보">
                    <Box className="아바타">{meeting.avatar}</Box>
                    <Box className="모임정보">
                      <Box className="닉네임">{meeting.nickName}</Box>
                      <Box className="댓글인원정보">
                        <Box className="인원정보">
                          <Box className="사람아이콘">{'아이콘'}</Box>
                          <Box className="사람수">{meeting.people}</Box>
                        </Box>
                        <Box className="댓글정보">
                          <Box className="댓글아이콘">{'아이콘'}</Box>
                          <Box className="댓글수">{meeting.comments}</Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <div className="책이미지">{meeting.bookImage}</div>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Flex>
  );
};

export default Meeting;
