import { UseQueryOptions } from '@tanstack/react-query';

export type QueryOptions<
  TQueryFnData,
  TQueryData = TQueryFnData
> = UseQueryOptions<Awaited<TQueryFnData>, unknown, TQueryData, string[]>;
