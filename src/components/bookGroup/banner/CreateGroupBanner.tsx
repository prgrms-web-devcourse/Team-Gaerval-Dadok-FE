import Image from '@/components/common/Image';

const CreateGroupBanner = () => {
  return (
    <article className="flex w-full cursor-pointer select-none items-center justify-between rounded-[0.8rem] bg-main-300 p-[2rem]">
      <div className="flex flex-col gap-[0.6rem]">
        <h3 className="text-main-900 font-body2-bold">원하는 모임이 없다면?</h3>
        <p className="whitespace-pre-line text-black-600 font-body2-bold">
          {`읽고 싶은 책으로
            직접 모임을 만들어 보세요`}
        </p>
      </div>
      <div>
        <Image
          src="/images/book-illustration.png"
          alt="책"
          width={81}
          height={48}
          loading="eager"
          priority
        />
      </div>
    </article>
  );
};

export default CreateGroupBanner;
