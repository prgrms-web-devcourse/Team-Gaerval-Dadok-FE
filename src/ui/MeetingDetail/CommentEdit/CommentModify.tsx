import { Textarea } from '@chakra-ui/react';

interface CommentFixProps {
  modifyValue: string | undefined;
  setModifyValue: (arg0: string) => void;
}

const CommentFix = ({ modifyValue, setModifyValue }: CommentFixProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyValue(event.target.value);
  };

  return <Textarea value={modifyValue} h="30rem" onChange={handleChange} />;
};

export default CommentFix;
