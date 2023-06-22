import { APIBookshelfInfo } from '@/types/bookshelf';
import { Flex, Text, useTheme } from '@chakra-ui/react';
import IconButton from '@/ui/common/IconButton';

type LikeCountType = {
  likeCount: APIBookshelfInfo['likeCount'];
};

const LikeCount = ({ likeCount }: LikeCountType) => {
  const theme = useTheme();

  return (
    <Flex
      w="4.2rem"
      h="2.4rem"
      p="0.2rem 0"
      gap="0.2rem"
      justify="flex-start"
      align="center"
      color={theme.colors.red['800']}
    >
      <IconButton
        as="div"
        name="like"
        size="1.6rem"
        strokeWidth={'0.05rem'}
        color={theme.colors.red['800']}
        fill
      />
      <Text fontSize="sm" fontWeight="900">
        {likeCount ? likeCount : 0}
      </Text>
    </Flex>
  );
};

export default LikeCount;
