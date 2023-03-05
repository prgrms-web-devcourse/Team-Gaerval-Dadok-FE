import { Textarea } from '@chakra-ui/react';

interface CommentFixProps {
  content: string | undefined;
}

const CommentFix = ({ content }: CommentFixProps) => {
  return <Textarea value={content} h="30rem" />;
};

export default CommentFix;
