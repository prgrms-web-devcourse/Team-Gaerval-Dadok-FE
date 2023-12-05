import { IconHeart } from '@public/icons';

type LikeButtonProps = {
  isLiked: boolean;
  likeCount: number;
  onClick: () => void;
};

const LikeButton = ({ isLiked, likeCount, onClick }: LikeButtonProps) => {
  const BG_COLOR_CLASS = isLiked ? 'bg-warning-800' : 'bg-white';
  const ICON_COLOR_CLASS = isLiked ? 'stroke-white' : 'stroke-warning-800';
  const TEXT_COLOR_CLASS = isLiked ? 'text-white' : 'text-warning-800';

  return (
    <button
      onClick={onClick}
      className={`${BG_COLOR_CLASS} flex h-[2.4rem] w-[5.4rem] items-center gap-[0.4rem] rounded-full border-[0.1rem] border-warning-800 bg-warning-800 px-[0.6rem] py-[0.2rem]`}
    >
      <IconHeart
        className={`${ICON_COLOR_CLASS} h-[1.3rem] w-[1.3rem] fill-white stroke-[0.15rem]`}
      />
      <p
        className={`${TEXT_COLOR_CLASS} w-[2.3rem] text-center text-xs font-bold`}
      >
        {likeCount}
      </p>
    </button>
  );
};

export default LikeButton;
