import {
  useBookshelfLike,
  useBookshelfUnlike,
} from '@/queries/bookshelf/useBookshelfLikeMutation';
import { APIBookshelfInfo } from '@/types/bookshelf';
import IconButton from '@/ui/common/IconButton';
import debounce from '@/utils/debounce';
import { Button, Flex, Text, useTheme } from '@chakra-ui/react';
import { useState } from 'react';

type LikeButtonTypes = {
  bookshelfId: APIBookshelfInfo['bookshelfId'];
  isLiked: APIBookshelfInfo['isLiked'];
  likeCount: APIBookshelfInfo['likeCount'];
};

const LikeButton = ({ bookshelfId, isLiked, likeCount }: LikeButtonTypes) => {
  const [buttonState, setButtonState] = useState({
    isLiked: isLiked,
    likeCount: likeCount,
  });
  const theme = useTheme();
  const likeBookshelf = useBookshelfLike(bookshelfId);
  const unlikeBookshelf = useBookshelfUnlike(bookshelfId);

  const handleBookshelfLikeMutate = () => {
    if (!buttonState.isLiked) {
      setButtonState(prev => ({
        isLiked: !prev.isLiked,
        likeCount: prev.likeCount + 1,
      }));
      likeBookshelf.mutate();
    } else if (buttonState.isLiked) {
      setButtonState(prev => ({
        isLiked: !prev.isLiked,
        likeCount: prev.likeCount - 1,
      }));
      unlikeBookshelf.mutate();
    }
  };

  return (
    <Button
      onClick={debounce(handleBookshelfLikeMutate, 200)}
      p="0.6rem 0.8rem"
      w="5.4rem"
      h="2.4rem"
      fontSize="xs"
      color={
        buttonState.isLiked
          ? theme.colors.white['800']
          : theme.colors.red['800']
      }
      bg={
        buttonState.isLiked
          ? theme.colors.red['800']
          : theme.colors.white['800']
      }
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
          color={
            buttonState.isLiked
              ? theme.colors.white['800']
              : theme.colors.red['800']
          }
          fill={true}
        />
        <Text w="2rem" fontWeight="900">
          {buttonState.likeCount ? buttonState.likeCount : 0}
        </Text>
      </Flex>
    </Button>
  );
};

export default LikeButton;
