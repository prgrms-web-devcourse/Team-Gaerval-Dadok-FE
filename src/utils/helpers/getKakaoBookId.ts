const getKakaoBookId = (kakaoImageUrl: string) => {
  const kakaoUrl = new URL(
    new URL(kakaoImageUrl).searchParams.get('fname') || ''
  ).pathname;
  return kakaoUrl.replace('/lbook/image/', '');
};

export default getKakaoBookId;
