import { SearchedBookWithId } from '@/types/book';

export type CreateBookGroupFormValues = {
  book: SearchedBookWithId;
  queryKeyword: string;
  title: string;
  introduce: string;
  maxMemberCount: 9999 | 50 | 100 | 200 | 500 | 'custom';
  customMemberCount: number;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  hasJoinPassword: 'true' | 'false';
  joinQuestion: string;
  joinPassword: string;
};

export type SelectBookStepFormValues = Pick<
  CreateBookGroupFormValues,
  'book' | 'queryKeyword'
>;

export type EnterTitleStepFormValues = Pick<CreateBookGroupFormValues, 'title'>;

export type SetUpDetailStepFormValues = Pick<
  CreateBookGroupFormValues,
  | 'book'
  | 'title'
  | 'introduce'
  | 'maxMemberCount'
  | 'customMemberCount'
  | 'startDate'
  | 'endDate'
  | 'isPublic'
>;

export type SelectJoinTypeStepFormValues = Pick<
  CreateBookGroupFormValues,
  'hasJoinPassword' | 'joinQuestion' | 'joinPassword'
>;
