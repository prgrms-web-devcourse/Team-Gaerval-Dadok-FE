import Image from 'next/image';
import Link from 'next/link';

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
      <div className="flex w-[10rem] flex-col gap-[0.5rem]">
        <div className="bg-orange-100 px-[1.8rem] py-[1.6rem]">
          <Image
            src={imageSource}
            alt="bookgroup"
            width={65}
            height={90}
            className="rounded-[0.5rem]"
          />
        </div>
        <div>
          <p className="break-keep text-center text-xs leading-6">
            {isOwner ? `👑 ${title}` : title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SimpleBookGroupCard;
