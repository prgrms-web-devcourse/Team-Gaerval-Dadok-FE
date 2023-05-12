import IconButton from '@/ui/common/IconButton';
import { Box, Button, Flex, Text, useTheme } from '@chakra-ui/react';

const LikeButton = () => {
  const theme = useTheme();

  /**
   * @todo
   * 타입 정의 (일단 isLike, count는 옵셔널하게 받기)
   * POST, DELETE 메서드 작성
   * bookshelfId props로 받기
   * onClick시 isLike 값에 따라 POST, DELETE 실행
   *
   * 우선 구현
   * 유저 책장 페이지
   *
   * 이후에 구현할 것
   * 책장 추천 리스트, 자기 자신 책장 조회(프로필)
   */

  return (
    <Box
      as={Button}
      w="5.4rem"
      h="2.4rem"
      p="0.6rem 0.8rem"
      fontSize="xs"
      border="solid 0.1rem"
      borderRadius="1.6rem"
      color={theme.colors.red['800']}
      bg={theme.colors.white['900']}
    >
      <Flex w="100%" h="100%" gap="0.2rem" justify="flex-start" align="center">
        <IconButton
          as="div"
          name="like"
          size="1.3rem"
          color={theme.colors.red['800']}
          fill={true}
        />
        <Text w="2rem">--</Text>
      </Flex>
    </Box>
  );
};

export default LikeButton;
