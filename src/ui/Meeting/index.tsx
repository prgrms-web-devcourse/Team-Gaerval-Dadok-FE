'use client';
import { Flex } from '@chakra-ui/react';

import MeetingList from './MeetingList';
import MeetingListHeader from './MeetingListHeader';

const MeetingPageContainer = () => {
  const DUMMY_DATA = [
    {
      title: '개발자들 모여라!',
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
      title: '모닥불과 함께하는 책읽기',
      content:
        '하지만 위의 예제처럼 적용이 되지 않아 한참을 헤매였다. 항상 이유를 찾다보면 몇글자가 달라서이다 display 속성이 blcok 이어야 text-overflow 속성이 잘 동작한다는 것이다. 텍스트는 보통 <span> 이나 <p> 태그에 잘 쓴다. 얘네들은 inline 요소다. 그렇기 떄문에 속성 지정을 block 으로 변경해주고 나서야 비로소 잘 동작하게 되었다.',
      id: 2525,
      avatar: 'https://bit.ly/dan-abramov',
      nickName: '잠실동쭈꾸미',
      people: 22,
      comments: 23,
      bookImage: '일본',
    },
    {
      title: '타입스크립트',
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
      title: '나의 라임 오렌지 나무',
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
    <Flex mt="2rem" direction="column" px="5%">
      <MeetingListHeader />
      <MeetingList meetingInfo={DUMMY_DATA} />
    </Flex>
  );
};

export default MeetingPageContainer;
