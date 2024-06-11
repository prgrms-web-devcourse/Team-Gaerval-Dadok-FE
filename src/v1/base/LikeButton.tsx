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
      className={`${BG_COLOR_CLASS} flex h-[2.4rem] items-center gap-[0.4rem] rounded-full border-[0.1rem] border-warning-800 bg-warning-800`}
    >
      <IconHeart className={`${ICON_COLOR_CLASS} ml-[1rem]`} />
      <p
        className={`${TEXT_COLOR_CLASS} mr-[1.1rem] min-w-[1.2rem] text-end font-caption1-bold`}
      >
        {likeCount}
      </p>
    </button>
  );
};

export default LikeButton;
