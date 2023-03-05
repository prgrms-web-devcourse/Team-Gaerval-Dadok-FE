import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';

interface MeetingInfoDataProps {
  title: string;
  content: string;
  start: string;
  end: string;
  book: string;
  people: string;
  comments: string;
  assession: boolean;
}
interface MeetingInfoProps {
  isJoinedMember: boolean;
  meetingInfoData: MeetingInfoDataProps;
  setIsJoinedMember: (arg0: boolean) => void;
}

const MeetingInfo = ({
  isJoinedMember,
  meetingInfoData,
  setIsJoinedMember,
}: MeetingInfoProps) => {
  const { title, content, start, end, book, people, comments, assession } =
    meetingInfoData;

  const handleClick = () => {
    /*모임 참여 버튼 클릭시, 
      1) 모임 참여 관련 API 호출 예정
      2) 유저의 책장에 책 꽂기 API 호출 예정
      setJoinedMember 함수는 테스트용으로 연결해 놓았습니다.*/
    setIsJoinedMember(true);
  };

  const message = assession ? '참여 가능' : '가입 승인 필요';

  return (
    <>
      <Flex direction="column" align="center">
        <Text fontSize="xl" fontWeight={700}>
          {title}
        </Text>
        <Text fontSize="md" m="1rem 0">
          {content}
        </Text>
      </Flex>
      <Flex mt="1.5rem" justify="space-between" h="13rem">
        <Box w="68%" bgColor="white" borderRadius="1rem" boxShadow="default">
          <Flex p="1rem" h="100%" direction="column" justify="space-between">
            <Box h="60%">
              <Box fontSize="1.2rem">
                {start} ~ {end}
              </Box>
              <Flex h="70%">
                <Text
                  fontSize="md"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  fontWeight={600}
                >
                  책: {book}
                </Text>
              </Flex>
            </Box>
            <Box>
              <Box fontSize="1.2rem" fontWeight={500} color="red.800">
                {isJoinedMember ? '' : message}
              </Box>
              <Flex>
                <Flex align="center" w="4rem">
                  <Box>
                    <Image src="/icons/peopleIcon.svg" alt="peopleIcon" />
                  </Box>
                  <Box fontSize="1rem" w="3rem" ml="0.5rem">
                    {people}
                  </Box>
                </Flex>
                <Flex align="center" w="4rem" ml="0.5rem">
                  <Box>
                    <Image src="/icons/commentIcon.svg" alt="commentIcon" />
                  </Box>
                  <Text fontSize="1rem" w="3rem" ml="0.5rem">
                    {comments}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Flex w="30%" justify="center" align="center">
          <Image
            src="http://image.yes24.com/goods/101865885/XL"
            alt="bookCover"
            w="10rem"
            objectFit="cover"
            borderRadius="1rem"
            boxShadow="default"
          />
        </Flex>
      </Flex>
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
    </>
  );
};

export default MeetingInfo;
