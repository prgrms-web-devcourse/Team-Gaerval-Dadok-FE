import Link from 'next/link';
import BookCover from '../book/BookCover';

interface SimpleBookGroupCardProps {
  title: string;
  isOwner: boolean;
  imageSource: string;
  bookGroupId: number;
}

const SimpleBookGroupCard = ({
  title,
  isOwner,
  imageSource,
  bookGroupId,
}: SimpleBookGroupCardProps) => {
  return (
    <Link href={`/group/${bookGroupId}`}>
      <div className="flex w-[10rem] flex-col gap-[1rem]">
        <div className="bg-orange-100 px-[1.8rem] py-[1.6rem]">
          <BookCover size="xsmall" src={imageSource} />
        </div>
        <p className="break-keep text-center text-xs leading-tight">
          {isOwner ? `👑 ${title}` : title}
        </p>
      </div>
    </Link>
  );
};

export default SimpleBookGroupCard;

export const SimpleBookGroupCardSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-[1rem]">
    <div className="h-[12.3rem] w-[10rem] rounded-[0.5rem] bg-black-400" />
    <div className="h-[1.3rem] w-[5rem] self-center bg-black-400" />
  </div>
);
