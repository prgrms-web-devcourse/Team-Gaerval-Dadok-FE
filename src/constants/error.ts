import { HttpStatusCode } from 'axios';

export const DefaultHTTPStatusCode = 400 | 401 | 403 | 404 | 500;
export type ErrorCode =
  | 'C1'
  | 'C2'
  | 'U1'
  | 'A1'
  | 'A2'
  | 'A3'
  | 'A4'
  | 'A5'
  | 'A6'
  | 'A7'
  | 'B1'
  | 'BS1'
  | 'BS2'
  | 'BC2'
  | 'BG1'
  | 'BG2'
  | 'BG3'
  | 'BG4'
  | 'BG5'
  | 'BG6'
  | 'BG7'
  | 'BG8';
export type ErrorCodeInfo = Partial<Record<ErrorCode, string>>;
export type APIErrorResponse = {
  code: ErrorCode;
  errors: string;
  message: string;
  status: HttpStatusCode;
  statusText: string;
};

export const ERROR_MESSAGE: Partial<Record<HttpStatusCode, ErrorCodeInfo>> = {
  400: {
    C1: '부모 댓글이 아닌 자식 댓글에는 댓글을 달 수 없어요.',
    C2: '잘못된 문자열이에요.',
    U1: '이미 존재하는 닉네임이에요.',
    BS1: '이미 책장에 포함된 책이에요.',
    BC2: '이미 도서에 남긴 코멘트가 있어요.',
    BG1: '모임 최대 인원을 초과했어요.',
    BG2: '이미 모임에 참여한 사용자예요.',
    BG3: '모임 비밀번호가 틀렸어요.',
    BG5: '모임 가입 기간이 지났어요.',
    BG6: '모임 참여자가 존재해서 모임을 삭제할 수 없어요.',
    BG7: '모임 최대 인원은 현재 참여 인원보다 작을 수 없어요.',
  },
  401: {
    A1: '존재하지 않는 사용자예요.',
    A2: '유효한 액세스 토큰이 아니에요.',
    A3: '유효한 리프레시 토큰이 아니에요. 다시 로그인 해 주세요.',
    A4: '액세스 토큰이 만료되었어요. 새로운 액세스 토큰 발급 요청을 보내주세요.',
    A5: '리프레시 토큰이 존재하지 않아요.',
    A6: '잘못된 로그아웃 요청이에요. 액세스 토큰이나 리프레시 토큰이 존재하지 않아요.',
    A7: '접근 권한이 없습니다.',
    BS1: '해당 사용자는 이 책장에 접근할 수 없어요.',
    BG4: '모임에 대한 권한이 없는 사용자예요.',
    BG8: '모임에 참여하지 않은 사용자에요.',
  },
  403: {
    C2: '해당 사용자가 작성한 코멘트가 아니에요.',
  },
  404: {
    C1: '리소스가 존재하지 않아요.',
  },
  500: {
    B1: '잘못된 도서 데이터 형식이에요.',
  },
};
