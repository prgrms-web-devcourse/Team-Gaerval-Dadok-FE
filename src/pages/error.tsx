import Button from '@/ui/common/Button';
import { Text, Highlight, Image, VStack } from '@chakra-ui/react';

export const ErrorPage = () => {
  return (
    <VStack
      align="center"
      justify="center"
      pos="relative"
      zIndex="1"
      bgColor="white.800"
      h="100dvh"
      gap="2rem"
    >
      <Image
        src="/images/loading.gif"
        width="50vw"
        maxW="20rem"
        alt="loading"
      />
      <VStack gap="1rem">
        <Text fontSize="2xl" fontWeight="medium">
          <Highlight
            query="다독이"
            styles={{ color: 'main', fontWeight: 'bold' }}
          >
            다독이도 몰라요~ 왜 이래요~
          </Highlight>
        </Text>
        <Button
          onClick={() => {
            window.location.replace('/');
          }}
          w="100%"
        >
          처음으로 돌아가기
        </Button>
      </VStack>
    </VStack>
  );
};

export default ErrorPage;
