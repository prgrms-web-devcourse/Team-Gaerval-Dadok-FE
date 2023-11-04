import Image from 'next/image';

interface SimpleBookGroupCardProps {
  title: string;
  isOwner: boolean;
  imageSource: string;
  handleClick: () => void;
}

const SimpleBookGroupCard = ({
  title,
  isOwner,
  handleClick,
  imageSource,
}: SimpleBookGroupCardProps) => {
  return (
    <div
      className="flex h-[15rem] w-[10rem] flex-col gap-[0.5rem]"
      onClick={handleClick}
    >
      <div className="h-[11.6rem] w-[10rem] rounded-[0.534rem] bg-orange-100 px-[1.8rem] py-[1.6rem]">
        <Image
          src={imageSource}
          alt="bookgroup"
          width={64}
          height={84}
          className="h-[8.4rem] w-[6.4rem] rounded-[0.412rem]"
        />
      </div>
      <div>
        <p className="break-keep text-center">
          {isOwner ? `👑 ${title}` : title}
        </p>
      </div>
    </div>
  );
};

export default SimpleBookGroupCard;