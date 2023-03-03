import { Box, Flex, List, Image, Text, Avatar } from '@chakra-ui/react';
import Link from 'next/link';

interface MeetingInfoProps {
  title: string;
  content: string;
  id: number;
  avatar: string;
  nickName: string;
  people: number;
  comments: number;
  bookImageURL: string;
}
interface MeetingListProps {
  meetingInfo: MeetingInfoProps[];
}

const MeetingList = ({ meetingInfo }: MeetingListProps) => {
  return (
    <List>
      <Box>
        {meetingInfo.map(meeting => {
          const {
            title,
            content,
            id,
            avatar,
            nickName,
            people,
            comments,
            bookImageURL,
          } = meeting;
          return (
            <Box key={id}>
              <Link href={`/meeting/${id}`}>
                <Flex
                  m="0.8rem 0"
                  w="100%"
                  h="24rem"
                  direction="column"
                  justify="space-between"
                  backgroundColor="white"
                  borderRadius="1rem"
                  p="1.5rem"
                  _hover={{ bgColor: 'white.800' }}
                  boxShadow="default"
                >
                  <Flex
                    justify="center"
                    align="center"
                    w="100%"
                    h="20%"
                    fontSize="lg"
                    overflow="hidden"
                    fontWeight={600}
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    _hover={{ textDecor: 'underLine' }}
                  >
                    {title}
                  </Flex>
                  <Flex h="80%" w="100%">
                    <Flex direction="column" w="70%">
                      <Text
                        h="62%"
                        w="100%"
                        mt="1rem"
                        fontSize="md"
                        lineHeight="1.6"
                        overflow="hidden"
                        _hover={{ textDecor: 'underLine' }}
                        color="black.700"
                      >
                        {content}
                      </Text>

                      <Box w="100%">
                        <Flex direction="column" mt="2rem">
                          <Flex w="100%">
                            <Flex align="center">
                              <Avatar src={avatar} loading="lazy" />
                            </Flex>
                            <Box>
                              <Flex
                                w="100%"
                                ml="1rem"
                                align="center"
                                fontSize="sm"
                              >
                                {nickName}
                              </Flex>
                              <Flex ml="1rem">
                                <Flex w="6rem" align="center">
                                  <Box>
                                    <Image
                                      src="/icons/peopleIcon.svg"
                                      alt="peopleIcon"
                                    />
                                  </Box>
                                  <Box w="4rem" ml="0.5rem" fontSize="1.2rem">
                                    {people}
                                  </Box>
                                </Flex>
                                <Flex w="6rem" align="center" ml="0.5rem">
                                  <Box>
                                    <Image
                                      src="/icons/commentIcon.svg"
                                      alt="bookCover"
                                    />
                                  </Box>
                                  <Box w="4rem" ml="0.5rem" fontSize="1.2rem">
                                    {comments}
                                  </Box>
                                </Flex>
                              </Flex>
                            </Box>
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                    <Flex
                      w="30%"
                      justify="center"
                      align="start"
                      pl="1rem"
                      pt="1.5rem"
                    >
                      <Image
                        src={bookImageURL}
                        alt="bookCover"
                        w="10rem"
                        objectFit="cover"
                        boxShadow="default"
                        borderRadius="0.5rem"
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Link>
            </Box>
          );
        })}
      </Box>
    </List>
  );
};

export default MeetingList;
