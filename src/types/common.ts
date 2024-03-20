export interface Pagination {
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  count: number;
  isEmpty: boolean;
}

export interface BookSearchPagination {
  requestedPageNumber: number;
  requestedPageSize: number;
  isLast: boolean;
  pageableCount: number;
  totalCount: number;
}
