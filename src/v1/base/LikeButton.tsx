import { APIBookshelfInfo } from '@/types/bookshelf';
import { IconHeart } from '@public/icons';

type LikeButtonProps = {
  isLiked: APIBookshelfInfo['isLiked'];
  likeCount: APIBookshelfInfo['likeCount'];
  onClick?: () => void;
};

const LikeButton = ({ isLiked, likeCount, onClick }: LikeButtonProps) => {
  const BG_COLOR_CLASS = isLiked ? 'bg-warning-800' : 'bg-white';
  const ICON_COLOR_CLASS = isLiked ? 'stroke-white' : 'stroke-warning-800';
  const TEXT_COLOR_CLASS = isLiked ? 'text-white' : 'text-warning-800';

  return (
    <button
      onClick={onClick}
      className={`${BG_COLOR_CLASS} flex h-[2.4rem] min-w-[5.6rem] items-center gap-[0.4rem] rounded-full border-[0.1rem] border-warning-800 bg-warning-800 px-[1rem]`}
    >
      <IconHeart
        className={`${ICON_COLOR_CLASS} h-[1.5rem] w-[1.5rem] fill-white stroke-[0.15rem]`}
      />
      <p
        className={`${TEXT_COLOR_CLASS} min-w-[1.5rem] text-center font-caption1-bold`}
      >
        {likeCount}
      </p>
    </button>
  );
};

export default LikeButton;
