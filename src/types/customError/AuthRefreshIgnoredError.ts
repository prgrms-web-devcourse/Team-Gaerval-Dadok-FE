/**
 * accessToken을 갱신하는 요청이 진행 중인 경우, 갱신 요청은 무시되고 해당 에러가 발생합니다.
 */
class AuthRefreshIgnoredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default AuthRefreshIgnoredError;
