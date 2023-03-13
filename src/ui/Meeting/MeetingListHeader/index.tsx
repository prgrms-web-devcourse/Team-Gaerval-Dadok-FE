import { Box, Flex, Button } from '@chakra-ui/react';
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
      <Flex mb="1rem" justify="space-between">
        <Box w="70%" fontSize="2rem" fontWeight="700">
          모임
        </Box>
        <Flex align="center">
          <Link href="/meeting/create" onClick={onClick}>
            <Button
              fontSize="1.4rem"
              fontWeight="500"
              w="100%"
              borderRadius="2rem"
              color="main"
              backgroundColor="white.900"
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
