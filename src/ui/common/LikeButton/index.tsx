import IconButton from '@/ui/common/IconButton';
import { Box, Flex, Text, useTheme } from '@chakra-ui/react';

interface Props {
  isButton?: boolean;
}

const LikeButton = ({ isButton = true }: Props) => {
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
      as={isButton ? 'button' : 'div'}
      p={isButton ? '0.6rem 0.8rem' : '0.4rem 0.6rem'}
      w="5.4rem"
      h="2.4rem"
      fontSize="xs"
      color={theme.colors.red['800']}
      bg={theme.colors.white['800']}
      border="solid 0.1rem"
      borderColor={
        isButton ? theme.colors.red['800'] : theme.colors.white['800']
      }
      borderRadius="1.6rem"
    >
      <Flex w="100%" h="100%" gap="0.2rem" justify="flex-start" align="center">
        <IconButton
          as="div"
          name="like"
          size={isButton ? '1.3rem' : '1.7rem'}
          color={theme.colors.red['800']}
          fill={true}
        />
        <Text w="2rem" fontWeight={isButton ? '500' : '900'}>
          --
        </Text>
      </Flex>
    </Box>
  );
};

export default LikeButton;
