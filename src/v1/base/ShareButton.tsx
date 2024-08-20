import useToast from '@/v1/base/Toast/useToast';

import { IconShare } from '@public/icons';

const ShareButton = () => {
  const { show: showToast } = useToast();

  const handleClickShareButton = () => {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        showToast({ message: '링크를 복사했어요', type: 'success' });
      })
      .catch(() => {
        showToast({ message: '잠시 후 다시 시도해주세요', type: 'error' });
      });
  };

  return (
    <button onClick={handleClickShareButton}>
      <IconShare />
    </button>
  );
};

export default ShareButton;
