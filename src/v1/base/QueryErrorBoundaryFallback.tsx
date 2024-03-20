import Button from '@/v1/base/Button';

const QueryErrorBoundaryFallback = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: (...args: unknown[]) => void;
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[1rem] rounded-lg py-[2rem]">
      <p className="text-md font-bold">
        데이터를 불러오는 중 문제가 발생했어요.
      </p>
      <Button size="small" onClick={resetErrorBoundary}>
        다시 불러오기
      </Button>
    </div>
  );
};

export default QueryErrorBoundaryFallback;
