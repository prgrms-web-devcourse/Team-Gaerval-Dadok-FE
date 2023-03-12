import Button from '@/ui/common/Button';
import { Heading, Highlight, Image, VStack } from '@chakra-ui/react';

export const NotFoundPage = () => {
  return (
    <VStack
      align="center"
      justify="center"
      pos="relative"
      zIndex="1"
      bgColor="white.800"
      h="100%"
      gap="2rem"
    >
      <Image
        src="/images/loading.gif"
        width="50vw"
        maxW="20rem"
        alt="loading"
      />
      <VStack gap="1rem">
        <Heading fontSize="2xl" fontWeight="medium">
          <Highlight
            query="다독이"
            styles={{ color: 'main', fontWeight: 'bold' }}
          >
            다독이가 길을 잃었어요.
          </Highlight>
        </Heading>
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

export default NotFoundPage;
