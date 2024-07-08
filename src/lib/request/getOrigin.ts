/**
 * host property를 가지는 객체(ex. URL)와
 * protocol 관련 헤더(x-forwarded-proto)를 추출하기 위한 header 객체를 전달받아
 * origin 문자열을 생셩하여 반환합니다.
 * - 문자열을 생성할 수 없으면 환경변수에 저장된 값을 전달합니다.
 * @param parsed host property를 가지는 객체
 * @param headers protocol을 추출하기 위한 header 객체
 */
export const getOrigin = (
  parsed: { host: string | null },
  headers: Headers
) => {
  const protocol = headers.get('x-forwarded-proto') ?? 'http';
  const envHost = process.env.NEXT_HOST;

  if (parsed.host) {
    return `${protocol}://${parsed.host}`;
  } else if (envHost) {
    return `${envHost}`;
  } else {
    return '';
  }
};
