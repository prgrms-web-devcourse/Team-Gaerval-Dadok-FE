import Link from 'next/link';
import BookCover from '@/components/book/BookCover';

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
      <article className="flex w-[10rem] flex-col gap-[1rem]">
        <div className="relative rounded-[0.5rem] bg-black-100 px-[1.8rem] py-[1.6rem]">
          {isOwner && (
            <span className="absolute left-[0.6rem] top-[0.6rem] z-10 rounded-[0.5rem] bg-main-300 px-[0.6rem] py-[0.4rem] text-main-900 font-caption2-bold">
              운영
            </span>
          )}
          <BookCover size="xsmall" src={imageSource} />
        </div>
        <p className="break-keep text-center !leading-tight font-caption1-regular">
          {title}
        </p>
      </article>
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
