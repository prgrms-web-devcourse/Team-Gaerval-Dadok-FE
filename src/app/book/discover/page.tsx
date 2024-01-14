'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import useBookSearchQuery from '@/queries/book/useBookSearchQuery';
import useRecentSearchesQuery from '@/queries/book/useRecentSearchesQuery';
import useDebounceValue from '@/hooks/useDebounce';
import { isAuthed } from '@/utils/helpers/auth';

import TopHeader from '@/v1/base/TopHeader';
import BookSearchInput from '@/v1/bookSearch/BookSearchInput';
import PopularBooks from '@/v1/bookSearch/PopularBooks';
import RecentSearch from '@/v1/bookSearch/RecentSearch';
import SearchResult from '@/v1/bookSearch/SearchResult';

/**
 * @todo
 * 유저 로그인 유무에 따른 최근 검색어, 인기 도서 visible
 */

const BookSearch = () => {
  const [inputSearchValue, setInputSearchValue] = useState<string>('');
  const queryKeyword = useDebounceValue(inputSearchValue, 1000);

  const { ref: inViewRef, inView } = useInView();

  const bookSearchInfo = useBookSearchQuery({
    query: queryKeyword,
    page: 1,
    pageSize: 12,
  });
  const recentSearchesInfo = useRecentSearchesQuery({ enabled: isAuthed() });

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

    isAuthed() && recentSearchesInfo.refetch();
  }, [
    bookSearchInfo.fetchNextPage,
    inView,
    bookSearchInfo.hasNextPage,
    queryKeyword,
    bookSearchInfo,
    recentSearchesInfo,
  ]);

  return (
    <>
      <TopHeader text={'Discover'} />
      <article className="flex h-full w-full flex-col gap-[3.8rem]">
        <BookSearchInput onChange={handleInputValueChange} />
        {inputSearchValue ? (
          <>
            <SearchResult searchedBooks={searchedBooks} />
            <div ref={inViewRef} />
          </>
        ) : (
          <>
            <RecentSearch recentSearches={recentSearches} />
            <PopularBooks />
          </>
        )}
      </article>
    </>
  );
};

export default BookSearch;
