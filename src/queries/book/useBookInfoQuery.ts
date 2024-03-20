import { UseQueryOptions } from '@tanstack/react-query';

import type { APIBook, APIBookDetail, BookDetail } from '@/types/book';

import bookAPI from '@/apis/book';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import bookKeys from './key';

const useBookInfoQuery = <TData = APIBookDetail>(
  bookId: APIBook['bookId'],
  options?: UseQueryOptions<APIBookDetail, unknown, TData>
) =>
  useQueryWithSuspense(
    bookKeys.detail(bookId),
    () => bookAPI.getBookInfo(bookId).then(({ data }) => data),
    options
  );

export default useBookInfoQuery;

const transformBookData = (data: APIBookDetail) =>
  ({
    bookId: data.bookId,
    title: data.title,
    author: data.author,
    isbn: data.isbn,
    summary: data.contents,
    bookUrl: data.url,
    imageUrl: data.imageUrl.replace('R120x174.q85', 'R300x0.q100'),
    publisher: data.publisher,
  } as BookDetail);

export const useBookInfo = (bookId: APIBook['bookId']) =>
  useBookInfoQuery(bookId, {
    select: transformBookData,
  });

export const useBookTitle = (bookId: APIBook['bookId']) =>
  useBookInfoQuery(bookId, {
    select: data => data.title,
  });
