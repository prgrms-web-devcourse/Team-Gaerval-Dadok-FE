import { Box, Flex, Image, Text } from '@chakra-ui/react';

interface MeetingDetailDummy {
  title: string;
  content: string;
  start: string;
  end: string;
  book: string;
  people: string;
  comments: string;
  assession: boolean;
}
interface MeetingDetailProps {
  joinedMember: boolean;
  MeetingDetailDummy: MeetingDetailDummy;
}

const MeetingDetail = ({
  joinedMember,
  MeetingDetailDummy,
}: MeetingDetailProps) => {
  const { title, content, start, end, book, people, comments, assession } =
    MeetingDetailDummy;

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
                {joinedMember ? '' : assession ? '참여 가능' : '가입 승인 필요'}
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
    </>
  );
};

export default MeetingDetail;
