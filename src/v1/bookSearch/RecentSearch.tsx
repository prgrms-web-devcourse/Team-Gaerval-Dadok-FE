import type { APIBookRecentSearchResponse } from '@/types/book';
import type { UseFormSetValue } from 'react-hook-form';

import Button from '@/v1/base/Button';

type RecentSearchProps = {
  recentSearches?: APIBookRecentSearchResponse[];
  setSearchValue: UseFormSetValue<{ searchValue: string }>;
};

const RecentSearch = ({
  recentSearches,
  setSearchValue,
}: RecentSearchProps) => {
  return (
    <section className="flex flex-col gap-[1.7rem]">
      <h2 className="h-[2.4rem] text-lg">최근 검색어</h2>
      {recentSearches ? (
        <div className="relative flex w-[calc(100%+2rem)] gap-[1rem] overflow-x-scroll whitespace-nowrap pb-[1rem]">
          {recentSearches.map(value => (
            <Button
              key={`${value.keyword}-${value.modifiedAt}`}
              size="small"
              fill={true}
              fullRadius={true}
              colorScheme="main-light"
              onClick={() => setSearchValue('searchValue', value.keyword)}
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
