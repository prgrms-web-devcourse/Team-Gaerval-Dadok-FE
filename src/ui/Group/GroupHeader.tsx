import { Box, Flex, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useDisclosure } from '@chakra-ui/react';
import LoginBottomSheet from '@/ui/LoginBottomSheet';
import { useAuth } from '@/hooks/auth';
import { MouseEvent } from 'react';

const GroupHeader = () => {
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
        <Flex align="center">
          <Link href="/group/create" onClick={onClick}>
            <Button
              fontSize="sm"
              borderRadius="0.6rem"
              color="white.900"
              backgroundColor="main"
              border="0.1rem solid"
              p="1.4rem 1.5rem"
              display="flex"
            >
              <Text
                alignSelf="center"
                fontSize="2rem"
                fontWeight="medium"
                mr="0.4rem"
              >
                +
              </Text>
              모임
            </Button>
          </Link>
        </Flex>
      </Flex>
      <LoginBottomSheet isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default GroupHeader;
