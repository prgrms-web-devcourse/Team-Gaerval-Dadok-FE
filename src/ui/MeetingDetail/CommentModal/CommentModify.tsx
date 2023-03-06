import { Textarea } from '@chakra-ui/react';
import { useState } from 'react';

import CommentModal from '.';

interface CommentModifyProps {
  comment: string;
}

const CommentModify = ({ comment }: CommentModifyProps) => {
  const [modifiedValue, setModeifiedValue] = useState(comment);

  console.log(modifiedValue);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModeifiedValue(event.target.value);
  };

  return (
    <CommentModal name="수정" title="글 수정하기" fontColor="main">
      <Textarea value={modifiedValue} h="30rem" onChange={handleChange} />
    </CommentModal>
  );
};

export default CommentModify;
