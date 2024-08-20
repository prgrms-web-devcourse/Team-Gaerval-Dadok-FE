import Image from 'next/image';

interface SimpleGroupProps {
  title: string;
  isOwner: boolean;
  imageSource: string;
  eventHandler: () => void;
}

const SimpleGroup = ({
  title,
  isOwner,
  eventHandler,
  imageSource,
}: SimpleGroupProps) => {
  return (
    <div
      className="flex h-[15rem] w-[10rem] flex-col gap-[0.5rem]"
      onClick={eventHandler}
    >
      <div className="flex h-[11.6rem] w-[10rem] items-center justify-center rounded-[0.534rem] bg-orange-100">
        <div className="h-[8.4rem] w-[6.4rem]">
          <Image
            src={imageSource}
            alt="bookgroup"
            width={64}
            height={84}
            style={{ width: '6.4rem', height: '8.4rem' }}
          />
        </div>
      </div>
      <div>
        <p className="break-keep text-center">
          {isOwner ? `👑 ${title}` : title}
        </p>
      </div>
    </div>
  );
};

export default SimpleGroup;
