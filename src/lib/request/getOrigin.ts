// 자체 서명 인증 환경에서도 https 프로토콜이 적용된 origin 생성
export const getOrigin = (request: Request) => {
  const { host } = new URL(request.url);
  const protocol = request.headers.get('x-forwarded-proto') ?? 'http';
  return `${protocol}://${host}`;
};
