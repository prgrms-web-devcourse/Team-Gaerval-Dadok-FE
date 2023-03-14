import { useAuth } from '@/hooks/auth';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { BookArchiveForAuth, BookArchiveForUnAuth } from '@/ui/BookArchive';
import { Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function BookArchive() {
  const { isAuthed } = useAuth();
  const { data: userData } = useMyProfileQuery({ enabled: isAuthed });

  const [userJobGroup, setUserJobGroup] = useState<string>('');

  useEffect(() => {
    if (!userData) return;
    setUserJobGroup(userData.job.jobGroupName);
  }, [userData]);

  return (
    <VStack as="main" width="100%" spacing="2rem">
      <VStack w="100%">
        <Text
          alignSelf="flex-start"
          fontSize="2rem"
          fontWeight="800"
          color="main"
        >
          BookArchive
        </Text>
        {/* <Box w="100%" h="10rem" bgColor="main" borderRadius="1rem" /> */}
      </VStack>
      {isAuthed && userJobGroup ? (
        <BookArchiveForAuth userJobGroup={userJobGroup} />
      ) : (
        <BookArchiveForUnAuth />
      )}
    </VStack>
  );
}
