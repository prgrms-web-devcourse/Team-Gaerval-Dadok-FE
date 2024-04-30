export const MAX_MEMBER_COUNT_VALUE = [
  {
    value: 'null',
    text: '제한없음',
  },
  {
    value: '500',
    text: '500명',
  },
  {
    value: '200',
    text: '200명',
  },
  {
    value: '100',
    text: '100명',
  },
  {
    value: '50',
    text: '50명',
  },
  {
    value: '직접입력',
    text: '직접입력',
  },
];

export const MAX_MEMBER_DEFAULT_VALUE = 'null';

export const IS_PUBLICK_VALUE = [
  { value: 'true', text: '공개' },
  { value: 'false', text: '비공개' },
];

export const IS_PUBLICK_DEFAULT_VALUE = 'true';

export const HAS_JOIN_PASSWORD_VALUE = [
  { value: 'true', text: '필요' },
  { value: 'false', text: '불필요' },
];

export const HAS_JOIN_PASSWORD_DEFAULT_VALUE = 'false';

export const MAX_MEMBER_COUNT_OPTIONS = [
  { label: '제한없음', value: 9999 },
  { label: '50명', value: 50 },
  { label: '100명', value: 100 },
  { label: '200명', value: 200 },
  { label: '500명', value: 500 },
  { label: '직접 입력', value: 'custom' },
] as const;
