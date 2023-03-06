import { Text, Highlight } from '@chakra-ui/react';

import CommentModal from '.';

const CommentDelete = () => {
  return (
    <CommentModal name="삭제" title="글 삭제하기" fontColor="red.900">
      <Text fontSize="md">
        <Highlight query="삭제" styles={{ color: 'red' }}>
          해당 글을 삭제하시겠습니까?
        </Highlight>
      </Text>
    </CommentModal>
  );
};

export default CommentDelete;
