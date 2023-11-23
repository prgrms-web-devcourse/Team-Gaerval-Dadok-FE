import {
  parseQueryArgs,
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export type UseQueryOptionWithoutSuspense<
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
  queryOptions?: UseQueryOptionWithoutSuspense<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >
) => {
  return useQuery({
    ...parseQueryArgs(queryKey, queryFunction, queryOptions),
    suspense: true,
  }) as UseQueryResult & {
    data: TData;
  };
};

export default useQueryWithSuspense;
