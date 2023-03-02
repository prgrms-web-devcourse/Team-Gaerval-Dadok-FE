import { Box, Button } from '@chakra-ui/react';

interface ParticipationBtnProps {
  isJoinedMember: boolean;
  setJoinedMember: (arg0: boolean) => void;
}

const ParticipationBtn = ({
  isJoinedMember,
  setJoinedMember,
}: ParticipationBtnProps) => {
  const handleClick = () => {
    /*모임 참여 버튼 클릭시, 
    1) 모임 참여 관련 API 호출 예정
    2) 유저의 책장에 책 꽂기 API 호출 예정
    setJoinedMember 함수는 테스트용으로 연결해 놓았습니다.*/
    setJoinedMember(true);
  };

  return (
    <Box mt="1.5rem">
      <Button
        w="100%"
        h="3.5rem"
        fontSize="sm"
        fontWeight="500"
        borderRadius="2rem"
        color="main"
        border="0.1rem solid"
        backgroundColor="white.900"
        onClick={handleClick}
        isDisabled={isJoinedMember}
        _disabled={{
          color: 'white',
          background: 'main',
          pointerEvents: 'none',
        }}
      >
        {isJoinedMember ? '참여 중' : '모임 참여하기'}
      </Button>
    </Box>
  );
};

export default ParticipationBtn;
