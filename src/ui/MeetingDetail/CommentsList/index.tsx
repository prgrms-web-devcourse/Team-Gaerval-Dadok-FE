import { Avatar, Box, Flex } from '@chakra-ui/react';

import CommentEdit from '../CommentEdit';

interface CommentsListDataProps {
  id: number;
  avatarURL: string;
  nickName: string;
  contents: string;
}
interface commentsListProps {
  commentsListData: CommentsListDataProps[];
}

const CommentsList = ({ commentsListData }: commentsListProps) => {
  return (
    <Box mt="1.5rem">
      <Box fontSize="lg" fontWeight={700}>
        댓글
      </Box>
      <Box>
        {commentsListData.map(comment => {
          return (
            <Box
              key={comment.id}
              mt="1rem"
              p="1rem"
              bgColor="white"
              borderRadius="1.5rem"
              boxShadow="default"
            >
              <Flex mb="0.5rem" justify="space-between">
                <Flex>
                  <Avatar src={comment.avatarURL} loading="lazy" />
                  <Flex align="center" fontSize="sm" ml="1rem" fontWeight={600}>
                    {comment.nickName}
                  </Flex>
                </Flex>
                <Flex align="center" pt="0.4rem">
                  <CommentEdit
                    title="글 수정하기"
                    name="수정"
                    fontColor="main"
                    content={comment.contents}
                  />
                  <CommentEdit
                    title="글 삭제하기"
                    name="삭제"
                    fontColor="red.900"
                  />
                </Flex>
              </Flex>
              <Box lineHeight="2.2rem" fontSize="md">
                {comment.contents}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CommentsList;
