import { useAuth } from '@/hooks/auth';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { BookArchiveForAuth, BookArchiveForUnAuth } from '@/ui/BookArchive';
import { Text, VStack } from '@chakra-ui/react';

export default function BookArchive() {
  const { isAuthed } = useAuth();
  const { data: userData, isSuccess } = useMyProfileQuery({
    enabled: isAuthed,
  });

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
      </VStack>
      {isAuthed && isSuccess ? (
        <BookArchiveForAuth userJobGroup={userData.job.jobGroupName} />
      ) : (
        <BookArchiveForUnAuth />
      )}
    </VStack>
  );
}
