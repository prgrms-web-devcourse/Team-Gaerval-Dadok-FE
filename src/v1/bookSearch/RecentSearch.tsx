import Button from '@/v1/base/Button';

const RecentSearch = () => {
  return (
    <section className="flex flex-col gap-[1.7rem]">
      <h2 className="h-[2.4rem] text-lg">최근 검색어</h2>
      <div className="relative flex h-[3.5rem] w-[calc(100%+2rem)] gap-[1rem] overflow-x-scroll whitespace-nowrap">
        <Button
          size="medium"
          fill={true}
          fullRadius={true}
          colorScheme="main-light"
        >
          스즈메의 문단속
        </Button>
        <Button
          size="medium"
          fill={true}
          fullRadius={true}
          colorScheme="main-light"
        >
          히가시노 게이고
        </Button>
        <Button
          size="medium"
          fill={true}
          fullRadius={true}
          colorScheme="main-light"
        >
          세이노의 가르침
        </Button>
        <Button
          size="medium"
          fill={true}
          fullRadius={true}
          colorScheme="main-light"
        >
          김길규 개새끼
        </Button>
        <Button
          size="medium"
          fill={true}
          fullRadius={true}
          colorScheme="main-light"
        >
          김길규 개새끼
        </Button>
        <Button
          size="medium"
          fill={true}
          fullRadius={true}
          colorScheme="main-light"
        >
          김길규 개새끼
        </Button>
      </div>
    </section>
  );
};

export default RecentSearch;
