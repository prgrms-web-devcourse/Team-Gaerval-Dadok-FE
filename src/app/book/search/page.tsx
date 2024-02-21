'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';

import useBookSearchQuery from '@/queries/book/useBookSearchQuery';
import useRecentSearchesQuery from '@/queries/book/useRecentSearchesQuery';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import useDebounceValue from '@/hooks/useDebounce';
import { checkAuthentication } from '@/utils/helpers';

import { IconSearch } from '@public/icons';
import TopHeader from '@/v1/base/TopHeader';
import Input from '@/v1/base/Input';
import RecentSearch, {
  RecentSearchSkeleton,
} from '@/v1/bookSearch/RecentSearch';
import BestSellers, { BestSellersSkeleton } from '@/v1/bookSearch/BestSellers';
import BookSearchResults from '@/v1/bookSearch/SearchResult';

type FormValues = {
  searchValue: string;
};

const BookSearch = () => {
  const isAuthenticated = checkAuthentication();

  const { register, watch, setValue } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      searchValue: '',
    },
  });

  const queryKeyword = useDebounceValue(watch('searchValue'), 1000);

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
        <div className="flex w-full items-center gap-[2rem] border-b-[0.05rem] border-black-900 p-[1rem] focus-within:border-main-900 [&>div]:w-full">
          <IconSearch className="fill-black h-[2.1rem] w-[2.1rem]" />
          <Input
            className="w-full appearance-none text-sm font-normal focus:outline-none"
            placeholder="책 제목, 작가를 검색해보세요"
            {...register('searchValue')}
          />
        </div>
        {watch('searchValue') ? (
          <>
            <BookSearchResults searchedBooks={searchedBooks} />
            <div ref={inViewRef} />
          </>
        ) : (
          <SSRSafeSuspense fallback={<ContentsSkelton />}>
            <RecentSearch
              recentSearches={recentSearches}
              setSearchValue={setValue}
            />
            <BestSellers />
          </SSRSafeSuspense>
        )}
      </article>
    </>
  );
};

const ContentsSkelton = () => {
  return (
    <>
      <RecentSearchSkeleton />
      <BestSellersSkeleton />
    </>
  );
};

export default BookSearch;
