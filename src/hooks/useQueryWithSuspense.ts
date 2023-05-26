import {
  parseQueryArgs,
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export type useQueryOptionWithOutSuspense<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'suspense'>;

const useQueryWithSuspense = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFunction?: QueryFunction<TQueryFnData, TQueryKey>,
  queryOptions?: useQueryOptionWithOutSuspense<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >
) => {
  return useQuery({
    ...parseQueryArgs(queryKey, queryFunction, queryOptions),
    suspense: true,
  }) as { data: TData };
};

export default useQueryWithSuspense;
