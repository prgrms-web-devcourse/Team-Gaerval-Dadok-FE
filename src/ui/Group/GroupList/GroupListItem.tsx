import { APIGroup } from '@/types/group';
import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const GroupListItem = ({
  bookGroupId,
  title,
  isPublic,
  introduce,
  hasJoinPasswd: _hasJoinPasswd,
  startDate,
  endDate,
  maxMemberCount,
  owner,
  currentMemberCount,
  commentCount,
  book,
}: APIGroup) => {
  return (
    <Box cursor="pointer" position="relative">
      <Box
        as={Link}
        position="absolute"
        width="full"
        height="full"
        href={`/group/${bookGroupId}`}
      />
      <Flex
        m="0.8rem 0"
        w="100%"
        h="30rem"
        direction="column"
        justify="space-between"
        backgroundColor="white"
        borderRadius="1rem"
        py="1rem"
        px="1.5rem"
        _hover={{ bgColor: 'white.800' }}
        boxShadow="default"
      >
        <Flex justify="space-between">
          <Text fontSize="xs" mb="1rem" color="black.600">
            {startDate} ~ {endDate}
          </Text>
          <Box>
            {!isPublic ? (
              <Image src="/icons/lock.svg" alt="잠김" w="1.7rem" />
            ) : (
              <Image src="/icons/unlock.svg" alt="풀림" w="1.7rem" />
            )}
          </Box>
        </Flex>
        <Flex
          justify="center"
          align="center"
          w="100%"
          h="2rem"
          fontSize="xl"
          fontWeight={600}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
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
              lineHeight="1.7"
              overflow="hidden"
              _hover={{ textDecor: 'underLine' }}
              color="black.900"
            >
              {introduce}
            </Text>
            <Box w="100%">
              <Flex direction="column" mt="2rem">
                <Flex w="100%">
                  <Flex align="center">
                    <Avatar
                      as={Link}
                      href={`/profile/${owner.id}`}
                      src={owner.profileUrl}
                      loading="lazy"
                    />
                  </Flex>
                  <Box>
                    <Flex w="100%" ml="1rem" align="center" fontSize="sm">
                      {owner.nickname}
                    </Flex>
                    <Flex ml="1rem" w="100%">
                      <Flex w="8rem" align="center">
                        <Box>
                          <Image src="/icons/peopleIcon.svg" alt="peopleIcon" />
                        </Box>
                        <Box w="6rem" ml="0.5rem" fontSize="1.2rem">
                          {currentMemberCount}
                          {maxMemberCount ? ` / ${maxMemberCount}` : ''}
                        </Box>
                      </Flex>
                      <Flex w="10rem" align="center" ml="0.5rem">
                        <Box>
                          <Image src="/icons/commentIcon.svg" alt="bookCover" />
                        </Box>
                        <Box w="10rem" ml="0.5rem" fontSize="1.2rem">
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
            <Link href={`/book/${book.id}`}>
              <Image
                src={book.imageUrl}
                alt="bookCover"
                w="10rem"
                objectFit="cover"
                boxShadow="default"
                borderRadius="0.5rem"
              />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default GroupListItem;
