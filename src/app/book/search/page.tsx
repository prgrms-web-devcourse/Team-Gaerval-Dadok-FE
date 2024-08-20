'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import useBookSearchQuery from '@/queries/book/useBookSearchQuery';
import useRecentSearchesQuery from '@/queries/book/useRecentSearchesQuery';

import useDebounceValue from '@/hooks/useDebounce';
import { checkAuthentication } from '@/utils/helpers';

import TopHeader from '@/v1/base/TopHeader';
import BookSearchInput from '@/v1/bookSearch/BookSearchInput';
import BestSellers from '@/v1/bookSearch/BestSellers';
import RecentSearch from '@/v1/bookSearch/RecentSearch';
import BookSearchResults from '@/v1/bookSearch/SearchResult';

/**
 * @todo
 * recentSearchedInfo 계속해서 refetch되는 현상 고치기
 */

const BookSearch = () => {
  const isAuthenticated = checkAuthentication();
  const [inputSearchValue, setInputSearchValue] = useState<string>('');

  const queryKeyword = useDebounceValue(inputSearchValue, 1000);

  const { ref: inViewRef, inView } = useInView();

  const bookSearchInfo = useBookSearchQuery({
    query: queryKeyword,
    page: 1,
    pageSize: 12,
  });
  const recentSearchesInfo = useRecentSearchesQuery({
    enabled: isAuthenticated,
  });

  const searchedBooks = bookSearchInfo.isSuccess
    ? bookSearchInfo.data.pages.flatMap(page => page.searchBookResponseList)
    : [];
  const recentSearches = recentSearchesInfo.isSuccess
    ? recentSearchesInfo.data.bookRecentSearchResponses
    : undefined;

  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target) return;

    const inputValue = event.target.value;

    setInputSearchValue(inputValue.trim());
  };

  useEffect(() => {
    if (inView && bookSearchInfo.hasNextPage) {
      bookSearchInfo.fetchNextPage();
    }
  }, [
    bookSearchInfo.fetchNextPage,
    inView,
    bookSearchInfo.hasNextPage,
    queryKeyword,
    bookSearchInfo,
  ]);

  return (
    <>
      <TopHeader text={'Discover'} />
      <article className="flex h-full w-full flex-col gap-[3.8rem]">
        <BookSearchInput
          value={inputSearchValue}
          onChange={handleInputValueChange}
        />
        {inputSearchValue ? (
          <>
            <BookSearchResults searchedBooks={searchedBooks} />
            <div ref={inViewRef} />
          </>
        ) : (
          <>
            <RecentSearch
              recentSearches={recentSearches}
              setInputSearchValue={setInputSearchValue}
            />
            <BestSellers />
          </>
        )}
      </article>
    </>
  );
};

export default BookSearch;
