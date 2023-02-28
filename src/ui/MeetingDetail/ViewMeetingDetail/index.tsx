import { Box, Flex, Image, Text } from '@chakra-ui/react';

const ViewMeetingDetail = () => {
  const MeetingDetailDummay = {
    start: '2023-03-01',
    end: '2024-02-28',
    bookTitle: '리팩터링 2판 리팩터링 2판 리팩터링 2판 리팩터링 2판',
    people: '1234',
    comments: '2334',
    assession: true,
  };

  return (
    <>
      <Flex direction="column" align="center">
        <Text fontSize="2rem" fontWeight={700}>
          모임 이름입니다.
        </Text>
        <Text fontSize="1.4rem" mt="0.5rem">
          모임 설명을 시작하겠습니다. 우리는 이러한 책을 읽고 이러한 내용을
          작성할 예정입니다.
        </Text>
      </Flex>
      <Flex mt="1.5rem" justify="space-between" h="13rem">
        <Box
          w="68%"
          bgColor="white"
          borderRadius="1rem"
          boxShadow="0px 0px 7px -5px #000000"
        >
          <Flex p="1rem" h="100%" direction="column" justify="space-between">
            <Box h="60%">
              <Box fontSize="1.2rem">
                {MeetingDetailDummay.start} ~ {MeetingDetailDummay.end}
              </Box>
              <Flex h="70%" align="center">
                <Text
                  fontSize="1.8rem"
                  fontWeight={500}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {MeetingDetailDummay.bookTitle}
                </Text>
              </Flex>
            </Box>
            <Box>
              <Box fontSize="1.2rem" fontWeight={500}>
                {MeetingDetailDummay.assession
                  ? '바로 가입 가능합니다'
                  : '가입 승인이 필요합니다'}
              </Box>
              <Flex>
                <Flex align="center" w="4rem">
                  <Box>
                    <Image src="/icons/peopleIcon.svg" alt="peopleIcon" />
                  </Box>
                  <Box fontSize="1rem" w="3rem" ml="0.5rem">
                    {MeetingDetailDummay.people}
                  </Box>
                </Flex>
                <Flex align="center" w="4rem" ml="0.5rem">
                  <Box>
                    <Image src="/icons/commentIcon.svg" alt="commentIcon" />
                  </Box>
                  <Text fontSize="1rem" w="3rem" ml="0.5rem">
                    {MeetingDetailDummay.comments}
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
            boxShadow="0px 0px 7px -5px #000000"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default ViewMeetingDetail;
