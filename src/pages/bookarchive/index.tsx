import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { isAuthed } from '@/utils/helpers';
import { Skeleton, Text, VStack } from '@chakra-ui/react';
import { Suspense } from 'react';
import useMounted from '@/hooks/useMounted';
import { BookArchiveForAuth, BookArchiveForUnAuth } from '@/ui/BookArchive';

export default function BookArchivePage() {
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
      <Suspense
        fallback={
          <VStack gap="3rem">
            <Skeleton width="39rem" height="19.6rem" />
            <Skeleton width="39rem" height="19.6rem" />
            <Skeleton width="39rem" height="19.6rem" />
          </VStack>
        }
      >
        <Contents />
      </Suspense>
    </VStack>
  );
}

const Contents = () => {
  const { data: userData } = useMyProfileQuery({
    enabled: isAuthed(),
  });
  const mounted = useMounted();
  if (!mounted) return null;

  return isAuthed() ? (
    <BookArchiveForAuth userJobGroup={userData.job.jobGroupName} />
  ) : (
    <BookArchiveForUnAuth />
  );
};
