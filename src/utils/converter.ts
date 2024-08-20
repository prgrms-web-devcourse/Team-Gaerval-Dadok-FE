export const getSafeNickname = (userId: number, nickname: string) => {
  if (nickname) {
    return nickname;
  } else if (userId) {
    return `익명${userId}`;
  } else {
    return '익명';
  }
};
