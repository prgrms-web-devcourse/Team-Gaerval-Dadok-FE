import type { RegisterOptions } from 'react-hook-form';

const FORM_RULES: {
  [index: string]: RegisterOptions;
} = {
  nickname: {
    required: '닉네임을 입력해주세요.',
    minLength: {
      value: 2,
      message: '닉네임을 2자 이상 입력해주세요.',
    },
    maxLength: {
      value: 10,
      message: '닉네임을 10자 이하로 입력해주세요.',
    },
    pattern: {
      value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,10}$/,
      message: '한글, 영문, 숫자만 입력 가능해요.',
    },
  },
  email: {
    required: '이메일을 입력해주세요',
    pattern: {
      value:
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      message: '이메일 형식을 다시 확인해주세요.',
    },
  },
  jobGroup: {
    required: '직군을 선택해주세요.',
  },
  job: {
    required: '직업을 선택해주세요.',
  },
  meetingTitle: {
    required: '모임 제목을 입력해 주세요.',
    minLength: {
      value: 2,
      message: '모임 제목을 2자 이상 입력해 주세요.',
    },
    maxLength: {
      value: 30,
      message: '모임 제목을 30자 이하로 입력해 주세요.',
    },
  },
  meetingExplanation: {
    required: '모임 내용을 입력해 주세요.',
    minLength: {
      value: 10,
      message: '모임 제목을 10자 이상 입력해 주세요.',
    },
    maxLength: {
      value: 200,
      message: '모임 제목을 200자 이하로 입력해 주세요.',
    },
  },
  meetingStartDate: {
    required: '모임 시작일을 선택해 주세요.',
  },
  meetingEndDate: {
    required: '모임 종료일을 선택해 주세요.',
  },
} as const;

export default FORM_RULES;
