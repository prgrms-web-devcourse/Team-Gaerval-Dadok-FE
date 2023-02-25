'use client';
import { Box, Button, Flex, Image, Textarea } from '@chakra-ui/react';
import { css } from '@emotion/react';

const MeetingDetail = () => {
  const dummyData = [
    {
      id: 1,
      avatarURL: 'https://bit.ly/dan-abramov',
      nickName: '김규란',
      contents:
        '백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
    },
    {
      id: 2,
      avatarURL: 'https://bit.ly/dan-abramov',
      nickName: '김재현',
      contents:
        '백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
    },
    {
      id: 3,
      avatarURL: 'https://bit.ly/dan-abramov',
      nickName: '백민종',
      contents:
        '백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
    },
    {
      id: 4,
      avatarURL: 'https://bit.ly/dan-abramov',
      nickName: '동해물과',
      contents:
        '백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
    },
  ];

  const MeetingDetailDummay = {
    start: '2023-03-01',
    end: '2024-02-28',
    bookTitle: '리팩터링 2판 리팩터링 2판 리팩터링 2판 리팩터링 2판',
    people: '1234',
    comments: '2334',
    assession: true,
  };

  return (
    <Flex justify="center" mt="1rem">
      <Flex w="90%" direction="column" justify="center">
        <Box className="뒤로 가기 아이콘">
          <Image src="/icons/goBackIcon.svg" alt="goBackIcon" />
        </Box>
        <Flex className="모임 이름 및 설명" direction="column" align="center">
          <Box className="모임 이름" fontSize="2rem" fontWeight={700}>
            모임 이름입니다.
          </Box>
          <Box className="모임 설명" fontSize="1.4rem" mt="0.5rem">
            모임 설명을 시작하겠습니다. 우리는 이러한 책을 읽고 이러한 내용을
            작성할 예정입니다.
          </Box>
        </Flex>
        <Flex
          className="책 정보 영역"
          mt="1.5rem"
          justify="space-between"
          h="13rem"
        >
          <Box w="68%" bgColor="white" borderRadius="1rem">
            <Flex p="1rem" h="100%" direction="column" justify="space-between">
              <Box h="60%">
                <Box className="모임기간" fontSize="1.2rem">
                  {MeetingDetailDummay.start} ~ {MeetingDetailDummay.end}
                </Box>
                <Flex h="70%" align="center">
                  <Box
                    className="책 제목"
                    fontSize="1.8rem"
                    fontWeight={500}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {MeetingDetailDummay.bookTitle}
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Box
                  className="가입 가능 여부"
                  fontSize="1.2rem"
                  fontWeight={500}
                >
                  {MeetingDetailDummay.assession
                    ? '바로 가입 가능합니다'
                    : '가입 승인이 필요합니다'}
                </Box>
                <Flex>
                  <Flex className="참여 인원" align="center" w="4rem">
                    <Box>
                      <Image src="/icons/peopleIcon.svg" alt="peopleIcon" />
                    </Box>
                    <Box fontSize="1rem" w="3rem" ml="0.5rem">
                      {MeetingDetailDummay.people}
                    </Box>
                  </Flex>
                  <Flex
                    className="댓글 개수"
                    align="center"
                    w="4rem"
                    ml="0.5rem"
                  >
                    <Box>
                      <Image src="/icons/commentIcon.svg" alt="commentIcon" />
                    </Box>
                    <Box fontSize="1rem" w="3rem" ml="0.5rem">
                      {MeetingDetailDummay.comments}
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Flex w="30%" justify="center" align="center">
            <Image
              src="http://image.yes24.com/goods/101865885/XL"
              alt="bookCover"
              w="10rem"
              objectFit="cover"
              borderRadius="1rem"
            />
          </Flex>
        </Flex>
        <Box className="모임 참여 버튼" mt="1.5rem">
          <Button
            w="100%"
            h="2.8rem"
            fontSize="1.3rem"
            fontWeight="500"
            borderRadius="2rem"
            color="main"
            border="main 0.2rem solid"
            backgroundColor="white.900"
            css={css`
          border: #f6ad55 0.1rem solid;
        `}
          >
            모임 참여하기
          </Button>
        </Box>
        <Box className="댓글 전체 영역" mt="1.5rem" h="100%">
          <Box>
            <Box fontSize="1.8rem" fontWeight={700} mb="1rem">
              댓글 작성
            </Box>
            <Box p="1rem" bgColor="white" borderRadius="1rem">
              <Flex>
                <Box>
                  <Image
                    borderRadius="full"
                    boxSize="3rem"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                  />
                </Box>
                <Flex align="center" ml="1rem">
                  <Box fontSize="1.4rem">사용자 닉네임</Box>
                </Flex>
              </Flex>
              <Box m="1rem 0">
                <Textarea
                  bgColor="white.800"
                  w="100%"
                  h="12rem"
                  fontSize="1.4rem"
                  placeholder="댓글을 작성해주세요"
                />
              </Box>
              <Flex justify="flex-end">
                <Button
                  fontSize="1.3rem"
                  fontWeight="500"
                  w="20%"
                  borderRadius="2rem"
                  color="main"
                  backgroundColor="white.900"
                  css={css`
                    border: #f6ad55 0.1rem solid;
                    `}
                >
                  작성하기
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box className="댓글 리스트 영역" mt="1.5rem">
          <Box>
            <Box className="댓글 작성 영역" fontSize="1.8rem" fontWeight={700}>
              댓글
            </Box>
            <Box className="댓글 리스트 영역">
              {dummyData.map(data => {
                return (
                  <Box key={data.id}>
                    <Box
                      mt="1rem"
                      p="1rem"
                      bgColor="white"
                      borderRadius="1.5rem"
                    >
                      <Flex className="아바타와 닉네임 영역" mb="0.5rem">
                        <Box>
                          <Image
                            src={data.avatarURL}
                            alt="avatar"
                            borderRadius="full"
                            boxSize="3rem"
                          />
                        </Box>
                        <Flex align="center">
                          <Box fontSize="1.4rem" ml="1rem" fontWeight={500}>
                            {data.nickName}
                          </Box>
                        </Flex>
                      </Flex>
                      <Box
                        className="댓글 내용영역"
                        lineHeight="1.6rem"
                        fontSize="1.4rem"
                      >
                        {data.contents}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default MeetingDetail;
