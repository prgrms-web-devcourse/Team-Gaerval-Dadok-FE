'use client';
import { Flex } from '@chakra-ui/react';

import MeetingListHeader from './MeetingListHeader';
import MeetingSearch from './MeetingSearch';
import MeetingList from './MeetingList';

const MeetingPageContainer = () => {
  const DUMMY_DATA = [
    {
      title: '악인을 만난적인 있나요?',
      content:
        '늘 감사하고 착한 사람 콤플렉스에 빠져 우울한 현실을 마주한 저자가 분노와 열등감으로 자신이 주도하는 삶을 살게 된 이야기를 담았다. 말하기, 글쓰기 기술을 비롯, 훈련을 통해 개발한 성공의 5가지 무기로 치열하게 자신을 불태울 각오로 노력하는 삶으로 이끄는 책이다.',
      id: 234,
      avatar: 'https://image.yes24.com/Goods/117498667/L',
      nickName: '아라한장풍',
      people: 1,
      comments: 1,
      bookImageURL: 'https://image.yes24.com/Goods/117498667/L',
    },
    {
      title: '주식 투자에 매번 실패하시는 분!',
      content:
        '성장할 것 같은 종목을 고르고, 해당 종목을 적절한 때 매수 매도해야 하며, 이 과정에서 잘못 들어갔다면 확실한 손절점을 정해서 손실을 보더라도 빠져나와야 결과적으로 수익을 볼 수 있다는 것이다. 초고수익은 운으로 만들어지지 않는다. 마크 미너비니가 공유한 투자법을 통해 모두 차세대 애플, 구글, 스타벅스를 찾길 바란다.',
      id: 2525,
      avatar: 'https://bit.ly/dan-abramov',
      nickName: '잠실동쭈꾸미',
      people: 22,
      comments: 23,
      bookImageURL: 'https://image.yes24.com/Goods/117650984/L',
    },
    {
      title: '살 때, 팔 때, 벌 때',
      content:
        '“주식의 시간은 따로 있다!”여의도 1타 브로커 강영현이 공개하는 2023 혼돈의 시장을 돌파할 최강 투자 바이블!',
      id: 7575,
      avatar: 'http://image.yes24.com/goods/117614110/XL',
      nickName: '응모아조씨',
      people: 3233,
      comments: 3233,
      bookImageURL: 'http://image.yes24.com/goods/117614110/XL',
    },
    {
      title: '톨스토이 책 읽으신 분들',
      content:
        '러시아의 세계적인 대문호이자 사상가인 톨스토이의 단편집. 인생의 진정한 의미를 잃어버린 사람들을 위해서 글을 쓴 톨스토이와 그의 작품들은 백 년이 지난 지금도 우리에게 강한 울림을 주고 있다.',
      id: 90,
      avatar: 'https://image.yes24.com/goods/117726598/L',
      nickName: '도마뱀꼬리는재생',
      people: 423,
      comments: 423,
      bookImageURL: 'https://image.yes24.com/goods/117726598/L',
    },
  ];
  return (
    <Flex mt="2rem" direction="column" px="5%" mb="9rem">
      <MeetingListHeader />
      <MeetingSearch />
      <MeetingList meetingInfo={DUMMY_DATA} />
    </Flex>
  );
};

export default MeetingPageContainer;
