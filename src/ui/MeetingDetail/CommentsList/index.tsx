import { Avatar, Box, Flex } from '@chakra-ui/react';

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
    <Box mt="1.5rem">
      <Box fontSize="lg" fontWeight={700}>
        댓글
      </Box>
      <Box>
        {dummyData.map(data => {
          return (
            <Box
              key={data.id}
              mt="1rem"
              p="1rem"
              bgColor="white"
              borderRadius="1.5rem"
              boxShadow="default"
            >
              <Flex mb="0.5rem">
                <Box>
                  <Avatar src={data.avatarURL} loading="lazy" />
                </Box>
                <Flex align="center" fontSize="sm" ml="1rem" fontWeight={600}>
                  {data.nickName}
                </Flex>
              </Flex>
              <Box lineHeight="2.2rem" fontSize="md">
                {data.contents}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CommentsList;
