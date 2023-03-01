import { Box, Flex, Textarea, Button, Avatar } from '@chakra-ui/react';
interface CommentInputBoxProps {
  joinedMember: boolean;
}

const CommentInputBox = ({ joinedMember }: CommentInputBoxProps) => {
  return (
    <Box mt="1.5rem" h="100%">
      <Box fontSize="lg" fontWeight={700} mb="1rem">
        댓글 작성
      </Box>
      <Box p="1rem" bgColor="white" borderRadius="1rem" boxShadow="default">
        <Flex>
          <Box>
            <Avatar src="https://bit.ly/dan-abramov" loading="lazy" />
          </Box>
          <Flex align="center" ml="1rem">
            <Box fontSize="sm" fontWeight={600}>
              사용자 닉네임
            </Box>
          </Flex>
        </Flex>
        <Box m="1rem 0">
          <Textarea
            bgColor="white.800"
            w="100%"
            h="12rem"
            fontSize="md"
            placeholder={
              !joinedMember
                ? '모임에 참여해야 글을 작성할 수 있습니다.'
                : '댓글을 작성해 주세요.'
            }
            isDisabled={!joinedMember}
          />
        </Box>
        <Flex justify="flex-end">
          <Button
            fontSize="sm"
            fontWeight="500"
            w="20%"
            borderRadius="2rem"
            color="main"
            backgroundColor="white.900"
            border="0.1rem solid"
            isDisabled={!joinedMember}
          >
            작성하기
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CommentInputBox;
