import { ComponentPropsWithoutRef, Suspense, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';

import type { MoveFunnelStepProps } from '@/components/common/Funnel';
import type { SelectBookStepFormValues } from '../../types';

import useBookSearchQuery from '@/queries/book/useBookSearchQuery';
import debounce from '@/utils/debounce';

import Input from '@/components/common/Input';
import Loading from '@/components/common/Loading';
import BookSearchList from '@/components/bookSearch/BookSearchList';

const SelectBookStep = ({ onNextStep }: MoveFunnelStepProps) => {
  const { control, getValues, setValue } =
    useFormContext<SelectBookStepFormValues>();

  const keywordValue = getValues('queryKeyword');
  const [keyword, setKeyword] = useState(keywordValue || '');
  const debouncedSetKeyword = debounce(setKeyword, 500);

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') e.preventDefault();

    return;
  };

  return (
    <article className="relative flex w-full flex-col gap-[1rem]">
      <h2 className="font-subheading-bold">
        어떤 책으로 독서모임을 시작할까요?
      </h2>

      <Input
        type="search"
        placeholder="책 제목, 작가를 검색해보세요"
        inputStyle="line"
        leftIconType="search"
        className="mb-[1rem]"
        defaultValue={keyword}
        onChange={event => debouncedSetKeyword(event.target.value)}
        onKeyDown={handleEnterKeyDown}
      />

      <Suspense fallback={<Loading fullpage />}>
        <Controller
          name="book"
          control={control}
          render={({ field: { onChange } }) => (
            <BookSearchResult
              queryKeyword={keyword}
              onBookClick={book => {
                // update 'book' value in hook form
                onChange(book);
                // update 'queryKeyword' value in hook form
                setValue('queryKeyword', keyword);
                onNextStep && onNextStep();
              }}
            />
          )}
        />
      </Suspense>
    </article>
  );
};

export default SelectBookStep;

// TODO: 도서 검색 페이지 컴포넌트와 공유할 수 있도록 분리
const BookSearchResult = ({
  queryKeyword,
  onBookClick,
}: {
  queryKeyword: string;
  onBookClick?: ComponentPropsWithoutRef<typeof BookSearchList>['onBookClick'];
}) => {
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

  // queryKeyword가 빈 값인 경우 검색되지 않으므로 null 반환
  if (!queryKeyword) {
    return null;
  }

  return (
    <section>
      <BookSearchList
        books={searchedBooks}
        totalCount={totalResultCount}
        onBookClick={onBookClick}
      />
      <div ref={inViewRef} />
    </section>
  );
};
