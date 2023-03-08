import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { APIMeetingDetail } from '@/types/meetingDetail';

interface MeetingInfoProps {
  meetingInfoData: APIMeetingDetail;
  handleParticipateBtnClick: () => void;
}

const MeetingInfo = ({
  meetingInfoData,
  handleParticipateBtnClick,
}: MeetingInfoProps) => {
  const {
    bookGroupId: _bookGroupId,
    title,
    introduce,
    startDate,
    endDate,
    hasJoinPasswd,
    isPublic: _isPublic,
    maxMemberCount: _maxMemberCount,
    currentMemberCount,
    commentCount,
    owner: _owner,
    book,
    isOwner: _isOwner,
    isGroupMember,
  } = meetingInfoData;

  const message = hasJoinPasswd ? '가입 승인 필요' : '참여 가능';

  return (
    <>
      <Flex direction="column" align="center">
        <Text fontSize="xl" fontWeight={700}>
          {title}
        </Text>
        <Text fontSize="md" m="1rem 0">
          {introduce}
        </Text>
      </Flex>
      <Flex mt="1.5rem" justify="space-between" h="13rem">
        <Box w="68%" bgColor="white" borderRadius="1rem" boxShadow="default">
          <Flex p="1rem" h="100%" direction="column" justify="space-between">
            <Box h="60%">
              <Box fontSize="1.2rem">
                {startDate} ~ {endDate}
              </Box>
              <Flex h="70%">
                <Text
                  fontSize="md"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  fontWeight={600}
                >
                  책: {book.title}
                </Text>
              </Flex>
            </Box>
            <Box>
              <Box fontSize="1.2rem" fontWeight={500} color="red.800">
                {isGroupMember ? '' : message}
              </Box>
              <Flex>
                <Flex align="center" w="4rem">
                  <Box>
                    <Image src="/icons/peopleIcon.svg" alt="peopleIcon" />
                  </Box>
                  <Box fontSize="1rem" w="3rem" ml="0.5rem">
                    {currentMemberCount}
                  </Box>
                </Flex>
                <Flex align="center" w="4rem" ml="0.5rem">
                  <Box>
                    <Image src="/icons/commentIcon.svg" alt="commentIcon" />
                  </Box>
                  <Text fontSize="1rem" w="3rem" ml="0.5rem">
                    {commentCount}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Flex w="30%" justify="center" align="center">
          <Image
            src={book.imageUrl}
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
          color="white.900"
          border="0.1rem solid"
          backgroundColor="main"
          onClick={() => {
            handleParticipateBtnClick();
          }}
          isDisabled={isGroupMember}
          _disabled={{
            border: 'none',
            color: 'main',
            background: 'white',
            pointerEvents: 'none',
          }}
        >
          {isGroupMember ? '참여 중' : '모임 참여하기'}
        </Button>
      </Box>
    </>
  );
};

export default MeetingInfo;
