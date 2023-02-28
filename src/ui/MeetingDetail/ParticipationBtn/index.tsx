import { Box, Button } from '@chakra-ui/react';

interface ParticipationBtnProps {
  joinedMember: boolean;
}

const ParticipationBtn = ({ joinedMember }: ParticipationBtnProps) => {
  const handleClick = () => {
    /*모임 참여 API 호출*/
    console.log('모임에 참여하였습니다.');
  };

  return (
    <Box mt="1.5rem">
      <Button
        w="100%"
        h="2.8rem"
        fontSize="sm"
        fontWeight="500"
        borderRadius="2rem"
        color="main"
        border="0.1rem solid"
        backgroundColor="white.900"
        onClick={handleClick}
      >
        {joinedMember ? '참여한 모임' : '모임 참여하기'}
      </Button>
    </Box>
  );
};

export default ParticipationBtn;
