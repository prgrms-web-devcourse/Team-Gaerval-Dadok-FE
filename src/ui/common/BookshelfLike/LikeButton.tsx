import { APIBookshelfInfo } from '@/types/bookshelf';
import IconButton from '@/ui/common/IconButton';
import { Button, Flex, Text, useTheme } from '@chakra-ui/react';

type LikeButtonTypes = {
  handleBookshelfLikeButton: () => void;
  isLiked: APIBookshelfInfo['isLiked'];
  likeCount: APIBookshelfInfo['likeCount'];
};

const LikeButton = ({
  handleBookshelfLikeButton,
  isLiked,
  likeCount,
}: LikeButtonTypes) => {
  const theme = useTheme();

  return (
    <Button
      onClick={handleBookshelfLikeButton}
      p="0.6rem 0.8rem"
      w="5.4rem"
      h="2.4rem"
      fontSize="xs"
      color={isLiked ? theme.colors.white['800'] : theme.colors.red['800']}
      bg={isLiked ? theme.colors.red['800'] : theme.colors.white['800']}
      border="solid 0.1rem"
      borderColor={theme.colors.red['800']}
      borderRadius="1.6rem"
    >
      <Flex w="100%" h="100%" gap="0.2rem" justify="flex-start" align="center">
        <IconButton
          as="div"
          name="like"
          size="1.3rem"
          strokeWidth={'0.05rem'}
          color={isLiked ? theme.colors.white['800'] : theme.colors.red['800']}
          fill={true}
        />
        <Text w="2rem" fontWeight="900">
          {likeCount ? likeCount : 0}
        </Text>
      </Flex>
    </Button>
  );
};

export default LikeButton;
