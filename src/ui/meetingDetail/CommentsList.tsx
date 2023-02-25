import { Box, Flex, Image } from '@chakra-ui/react';

const CommentsList = () => {
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

  return (
    <Box className="댓글 리스트 영역" mt="1.5rem">
      <Box className="댓글 영역" fontSize="1.8rem" fontWeight={700}>
        댓글
      </Box>
      <Box className="댓글 리스트 영역">
        {dummyData.map(data => {
          return (
            <Box key={data.id}>
              <Box mt="1rem" p="1rem" bgColor="white" borderRadius="1.5rem">
                <Flex className="아바타와 닉네임 영역" mb="0.5rem">
                  <Box>
                    <Image
                      src={data.avatarURL}
                      alt="avatar"
                      borderRadius="full"
                      boxSize="3rem"
                    />
                  </Box>
                  <Flex
                    align="center"
                    fontSize="1.4rem"
                    ml="1rem"
                    fontWeight={500}
                  >
                    {data.nickName}
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
  );
};

export default CommentsList;
