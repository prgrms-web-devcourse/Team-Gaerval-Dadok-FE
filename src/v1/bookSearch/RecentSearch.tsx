import type { APIBookRecentSearchResponse } from '@/types/book';

import Button from '@/v1/base/Button';

type RecentSearchProps = {
  recentSearches: APIBookRecentSearchResponse[] | undefined;
};

const RecentSearch = ({ recentSearches }: RecentSearchProps) => {
  return (
    <section className="flex flex-col gap-[1.7rem]">
      <h2 className="h-[2.4rem] text-lg">최근 검색어</h2>
      {recentSearches ? (
        <div className="relative flex h-[4.5rem] w-[calc(100%+2rem)] gap-[1.5rem] overflow-x-scroll whitespace-nowrap pb-[1rem]">
          {recentSearches.map(value => (
            <Button
              key={`${value.keyword}-${value.modifiedAt}`}
              size="medium"
              fill={true}
              fullRadius={true}
              colorScheme="main-light"
            >
              {value.keyword}
            </Button>
          ))}
        </div>
      ) : (
        <p className="mb-[2.4rem] text-center text-sm text-placeholder">
          검색 기록이 없어요!
        </p>
      )}
    </section>
  );
};

export default RecentSearch;
