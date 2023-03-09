import { APIMeetingGroup } from '@/types/meeting';
import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const MeetingListItem = ({
  bookGroupId,
  title,
  introduce,
  owner,
  memberCount,
  commentCount,
  book,
}: APIMeetingGroup) => {
  return (
    <Box>
      <Link href={`/meeting/${bookGroupId}`}>
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
                {introduce}
              </Text>
              <Box w="100%">
                <Flex direction="column" mt="2rem">
                  <Flex w="100%">
                    <Flex align="center">
                      <Avatar src={owner.profileUrl} loading="lazy" />
                    </Flex>
                    <Box>
                      <Flex w="100%" ml="1rem" align="center" fontSize="sm">
                        {owner.nickname}
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
                            {memberCount}
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
                            {commentCount}
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            <Flex w="30%" justify="center" align="start" pl="1rem" pt="1.5rem">
              <Image
                src={book.imageUrl}
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
};

export default MeetingListItem;
