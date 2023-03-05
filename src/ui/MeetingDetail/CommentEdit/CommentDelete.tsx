import { Text, Highlight } from '@chakra-ui/react';

const CommentDelete = () => {
  return (
    <Text fontSize="md">
      <Highlight query="삭제" styles={{ color: 'red' }}>
        해당 글을 삭제하시겠습니까?
      </Highlight>
    </Text>
  );
};

export default CommentDelete;
