import { UseQueryOptions } from '@tanstack/react-query';

export type QueryOptions<T> = UseQueryOptions<Awaited<T>, unknown, T, string[]>;
