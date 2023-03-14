import { Box, Flex, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useDisclosure } from '@chakra-ui/react';
import LoginBottomSheet from '@/ui/LoginBottomSheet';
import { useAuth } from '@/hooks/auth';
import { MouseEvent } from 'react';

const MeetingListHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthed } = useAuth();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isAuthed) return;
    onOpen();
    event.preventDefault();
  };

  return (
    <Box width="100%">
      <Flex mb="2rem" justify="space-between">
        <Text
          alignSelf="flex-start"
          fontSize="2rem"
          fontWeight="800"
          color="main"
        >
          Group
        </Text>
        {/* <Flex align="center">
          <Image width="2.7rem" src="icons/hashtag.svg" alt="hastagIcon" />
          <Text fontSize="lg" fontWeight="700" pl="0.5rem">
            모임
          </Text>
        </Flex> */}
        <Flex align="center">
          <Link href="/meeting/create" onClick={onClick}>
            <Button
              fontSize="sm"
              fontWeight="bold"
              w="100%"
              borderRadius="0.7rem"
              color="white.900"
              backgroundColor="main"
              border="0.1rem solid"
            >
              모임 만들기
            </Button>
          </Link>
        </Flex>
      </Flex>
      <LoginBottomSheet isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default MeetingListHeader;
