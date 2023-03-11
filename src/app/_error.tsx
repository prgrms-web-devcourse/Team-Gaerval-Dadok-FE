import Button from '@/ui/common/Button';
import Logo from '@/ui/common/Logo';
import { Heading, Highlight, VStack } from '@chakra-ui/react';

export const ErrorPage = () => {
  return (
    <VStack
      align="center"
      justify="center"
      pos="relative"
      zIndex="1"
      bgColor="white.800"
      h="100vh"
      px="2rem"
      gap="26rem"
    >
      <VStack w="100%" align="flex-start" spacing="3rem" px="2rem">
        <Logo width={65} />
        <Heading fontSize="2xl" fontWeight="medium">
          <Highlight
            query="오류"
            styles={{ color: 'main', fontWeight: 'bold' }}
          >
            알 수 없는 오류가 발생했어요.
          </Highlight>
        </Heading>
      </VStack>
      <Button
        onClick={() => {
          window.location.replace('/');
        }}
        w="100%"
      >
        처음으로 돌아가기
      </Button>
    </VStack>
  );
};

export default ErrorPage;
