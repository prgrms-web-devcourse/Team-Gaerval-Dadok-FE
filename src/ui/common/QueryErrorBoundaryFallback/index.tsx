import { Text, VStack } from '@chakra-ui/react';
import Button from '../Button';
import type { BorderProps, LayoutProps } from '@chakra-ui/react';

const QueryErrorBounaryFallback = ({
  resetErrorBoundary,
  minH,
  border = '1px solid #dddddd',
}: {
  resetErrorBoundary: (...args: unknown[]) => void;
  minH?: LayoutProps['minH'];
  border?: BorderProps['border'];
}) => {
  return (
    <VStack
      w="100%"
      h="100%"
      justify="center"
      minH={minH}
      border={border}
      borderRadius="2xl"
    >
      <Text fontSize="md">데이터를 불러오는 중 문제가 발생했어요!</Text>
      <Button size="md" onClick={() => resetErrorBoundary()}>
        다시 불러오기
      </Button>
    </VStack>
  );
};

export default QueryErrorBounaryFallback;
