'use client';

import { Suspense, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';

import useBookSearchQuery from '@/queries/book/useBookSearchQuery';
import { useRecentSearchListQuery } from '@/queries/book/useRecentSearchesQuery';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import useDebounceValue from '@/hooks/useDebounce';
import { checkAuthentication } from '@/utils/helpers';

import Loading from '@/v1/base/Loading';
import Input from '@/v1/base/Input';
import TopHeader from '@/v1/base/TopHeader';
import BestSellers, { BestSellersSkeleton } from '@/v1/bookSearch/BestSellers';
import RecentSearchList, {
  RecentSearchListSkeleton,
} from '@/v1/bookSearch/RecentSearchList';
import BookSearchList from '@/v1/bookSearch/BookSearchList';
import { IconSearch } from '@public/icons';

type FormValues = {
  searchValue: string;
};

const BookSearchPage = () => {
  const { register, watch, setValue } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      searchValue: '',
    },
  });

  const queryKeyword = useDebounceValue(watch('searchValue'), 1000);

  return (
    <>
      <TopHeader text={'Discover'} />
      <article className="flex max-h-[calc(100%-6rem)] w-full flex-col gap-[3rem]">
        <div className="flex w-full items-center gap-[2rem] border-b-[0.05rem] border-black-900 p-[1rem] focus-within:border-main-900 [&>div]:w-full">
          <IconSearch className="fill-black h-[2.1rem] w-[2.1rem]" />
          <Input
            className="w-full appearance-none text-sm font-normal focus:outline-none"
            placeholder="책 제목, 작가를 검색해보세요"
            {...register('searchValue')}
          />
        </div>
        {watch('searchValue') ? (
          /** 도서 검색 결과 */
          <section className="flex-grow overflow-y-scroll pb-[1rem]">
            <Suspense fallback={<Loading fullpage />}>
              {watch('searchValue') === queryKeyword ? (
                <BookSearchResult queryKeyword={queryKeyword} />
              ) : (
                /* 타이핑 중 debounce가 적용되어 queryKeyword가 업데이트 되지 않는 경우에 Loading 컴포넌트로 대체 */
                <Loading fullpage />
              )}
            </Suspense>
          </section>
        ) : (
          /** 최근 검색어 + 베스트 셀러 */
          <section className="flex flex-col gap-[1.6rem]">
            <SSRSafeSuspense fallback={<ContentsSkelton />}>
              <RecentSearchResult
                onItemClick={keyword => setValue('searchValue', keyword)}
              />
              <BestSellers />
            </SSRSafeSuspense>
          </section>
        )}
      </article>
    </>
  );
};

const BookSearchResult = ({ queryKeyword }: { queryKeyword: string }) => {
  const { ref: inViewRef, inView } = useInView();

  const bookSearchInfo = useBookSearchQuery({
    query: queryKeyword,
    page: 1,
    pageSize: 12,
  });

  const searchedBooks = bookSearchInfo.isSuccess
    ? bookSearchInfo.data.pages.flatMap(page => page.searchBookResponseList)
    : [];
  const totalResultCount = bookSearchInfo.isSuccess
    ? bookSearchInfo.data.pages[0].totalCount
    : 0;

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
      <BookSearchList books={searchedBooks} totalCount={totalResultCount} />
      <div ref={inViewRef} />
    </>
  );
};

const RecentSearchResult = ({
  onItemClick,
}: {
  onItemClick?: (item: string) => void;
}) => {
  const isAuthenticated = checkAuthentication();

  const { data: keywords } = useRecentSearchListQuery({
    enabled: isAuthenticated,
  });

  return <RecentSearchList keywords={keywords} onClick={onItemClick} />;
};

const ContentsSkelton = () => {
  return (
    <>
      <RecentSearchListSkeleton />
      <BestSellersSkeleton />
    </>
  );
};

export default BookSearchPage;
