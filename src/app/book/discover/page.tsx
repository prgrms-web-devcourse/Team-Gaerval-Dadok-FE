import TopHeader from '@/v1/base/TopHeader';
import BookSearchInput from '@/v1/bookSearch/BookSearchInput';
import PopularBooks from '@/v1/bookSearch/PopularBooks';
import RecentSearch from '@/v1/bookSearch/RecentSearch';

/**
 * @todo
 * ref와 debounce를 활용한 검색기능 구현
 * 검색 요청 값 o: 무한 스크롤
 * 검색 요청 값 x: 최근 검색어, 인기 도서
 *
 * 유저 로그인 유무에 따른 최근 검색어, 인기 도서 visible
 */

const BookSearch = () => {
  const onSearch = false;

  return (
    <>
      <TopHeader text={'Discover'} />
      <article className="flex h-full w-full flex-col gap-[3.8rem]">
        <BookSearchInput />
        {onSearch ? (
          <></>
        ) : (
          <>
            <RecentSearch />
            <PopularBooks />
          </>
        )}
      </article>
    </>
  );
};

export default BookSearch;
