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
  bookImage: string;
}
interface MeetingListProps {
  meetingInfo: MeetingInfoProps[];
}

const MeetingList = ({ meetingInfo }: MeetingListProps) => {
  return (
    <List>
      <Box>
        {meetingInfo.map(meeting => {
          const { title, content, id, avatar, nickName, people, comments } =
            meeting;
          return (
            <Box key={id}>
              <Link href={`/meeting/${id}`}>
                <Flex
                  m="0.8rem 0"
                  w="100%"
                  h="22rem"
                  justify="space-between"
                  backgroundColor="white"
                  borderRadius="1rem"
                  p="1.5rem"
                  _hover={{ bgColor: 'white.800' }}
                  boxShadow="default"
                >
                  <Box w="65%">
                    <Box h="70%">
                      <Text
                        w="100%"
                        h="30%"
                        fontSize="lg"
                        overflow="hidden"
                        fontWeight={600}
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        _hover={{ textDecor: 'underLine' }}
                      >
                        {title}
                      </Text>
                      <Text
                        h="75%"
                        fontSize="md"
                        lineHeight="1.5"
                        overflow="hidden"
                        _hover={{ textDecor: 'underLine' }}
                      >
                        {content}
                      </Text>
                    </Box>
                    <Flex pt="2rem">
                      <Avatar src={avatar} loading="lazy" />
                      <Flex direction="column" w="80%" ml="1rem">
                        <Box>{nickName}</Box>
                        <Flex>
                          <Flex w="4rem" align="center">
                            <Box>
                              <Image
                                src="/icons/peopleIcon.svg"
                                alt="peopleIcon"
                              />
                            </Box>
                            <Box w="3rem" ml="0.5rem">
                              {people}
                            </Box>
                          </Flex>
                          <Flex w="4rem" align="center" ml="0.5rem">
                            <Box>
                              <Image
                                src="/icons/commentIcon.svg"
                                alt="bookCover"
                              />
                            </Box>
                            <Box w="3rem" ml="0.5rem">
                              {comments}
                            </Box>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                  <Flex w="35%" justify="center" align="center" pl="1rem">
                    <Image
                      src="http://image.yes24.com/goods/101865885/XL"
                      alt="bookCover"
                      w="10rem"
                      objectFit="cover"
                      boxShadow="default"
                      borderRadius="0.5rem"
                    />
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
