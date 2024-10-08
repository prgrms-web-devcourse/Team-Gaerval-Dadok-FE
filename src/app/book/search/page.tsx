'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';

import { APIBook } from '@/types/book';

import useBookSearchQuery from '@/queries/book/useBookSearchQuery';
import { useRecentSearchListQuery } from '@/queries/book/useRecentSearchesQuery';
import bookAPI from '@/apis/book';

import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import useDebounceValue from '@/hooks/useDebounce';
import useQueryParams from '@/hooks/useQueryParams';
import useIsScrollAtTop from '@/hooks/useIsScrollAtTop';
import { checkAuthentication } from '@/utils/helpers';

import Loading from '@/components/common/Loading';
import Input from '@/components/common/Input';
import TopHeader from '@/components/common/TopHeader';
import BestSellers, {
  BestSellersSkeleton,
} from '@/components/bookSearch/BestSellers';
import RecentSearchList, {
  RecentSearchListSkeleton,
} from '@/components/bookSearch/RecentSearchList';
import BookSearchList from '@/components/bookSearch/BookSearchList';

type FormValues = {
  searchValue: string;
};

const KEYWORD = 'keyword';

const BookSearchPage = () => {
  const { getQueryParam, setQueryParams, removeQueryParam } = useQueryParams();

  const { register, watch, setValue } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      searchValue: getQueryParam(KEYWORD) ?? '',
    },
  });

  const watchedKeyword = watch('searchValue');
  const debouncedKeyword = useDebounceValue(watchedKeyword, 1000);

  const { isScrollAtTop } = useIsScrollAtTop();

  /* debounce된 keyword값에 따라 queryParameter를 수정하는 useEffect */
  useEffect(() => {
    const queryValue = getQueryParam(KEYWORD);

    if (debouncedKeyword) {
      setQueryParams({ [KEYWORD]: debouncedKeyword });
    } else if (!debouncedKeyword && queryValue) {
      removeQueryParam(KEYWORD, 'replace');
    }
  }, [debouncedKeyword, getQueryParam, setQueryParams, removeQueryParam]);

  /* TopHeader가 사라졌을 때 input의 위치 top: topSafeArea + 6.15rem */
  const inputPositionClasses =
    watchedKeyword && 'sticky top-[calc(env(safe-area-inset-top)+6.15rem)]';

  /* 검색어가 입력되었을 때 각 컨테이너의 애니메이션 class */
  const discoverPageAnimationClasses = `transition duration-500 ${
    watchedKeyword ? '-translate-y-[6.05rem]' : 'translate-y-0'
  }`;
  const headingOpacityClasses = `${
    watchedKeyword ? 'opacity-0' : 'opacity-100'
  }`;

  return (
    <>
      <TopHeader blur={!isScrollAtTop} className={discoverPageAnimationClasses}>
        <h1
          className={`text-main-900 font-heading-bold ${headingOpacityClasses}`}
        >
          Discover
        </h1>
      </TopHeader>
      <article
        className={`flex w-full flex-col gap-[3rem] ${discoverPageAnimationClasses}`}
      >
        <Input
          type="search"
          inputStyle="line"
          leftIconType="search"
          placeholder="책 제목, 작가를 검색해보세요"
          className={`z-10 bg-white ${inputPositionClasses}`}
          {...register('searchValue')}
        />

        {/** 최근 검색어 + 베스트 셀러 */}
        <section
          className={`flex flex-col gap-[2rem] ${watchedKeyword && 'hidden'}`}
        >
          <SSRSafeSuspense fallback={<ContentsSkelton />}>
            <RecentSearchResult
              onItemClick={keyword => setValue('searchValue', keyword)}
            />
            <BestSellers />
          </SSRSafeSuspense>
        </section>

        {/** 도서 검색 결과 */}
        {watchedKeyword && (
          <section className="flex-grow pb-[1rem]">
            <Suspense fallback={<BookSearchLoading />}>
              {watchedKeyword === debouncedKeyword ? (
                <BookSearchResult queryKeyword={debouncedKeyword} />
              ) : (
                /* 타이핑 중 debounce가 적용되어 keyword가 업데이트 되지 않는 경우에 Loading 컴포넌트로 대체 */
                <BookSearchLoading />
              )}
            </Suspense>
          </section>
        )}
      </article>
    </>
  );
};

const BookSearchResult = ({ queryKeyword }: { queryKeyword: string }) => {
  const router = useRouter();
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

  const handleBookClick = async ({ bookId }: { bookId: APIBook['bookId'] }) => {
    try {
      await bookAPI.storeRecentSearch(queryKeyword);
      router.push(`/book/${bookId}`);
    } catch (error) {
      console.error(error);
    }
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
      <BookSearchList
        books={searchedBooks}
        totalCount={totalResultCount}
        onBookClick={handleBookClick}
      />
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

const BookSearchLoading = () => {
  return (
    /**
     * Loading 컴포넌트가 화면 중앙에 올바르게 표시되도록 height가 존재하는 relative div 요소 추가
     * 화면이 스크롤 되지 않는 크기: 100dvh - 23.3rem
     */
    <div className="relative flex h-[calc(100dvh-23.3rem)]">
      <Loading fullpage />
    </div>
  );
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
