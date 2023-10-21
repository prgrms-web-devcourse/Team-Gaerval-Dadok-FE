import { APIBookshelf } from '@/types/bookshelf';
import { IconHeart } from '@public/icons';
import Badge from '../Base/Badge';
import InteractiveBook from '../InteractiveBook';

const Bookshelf = ({ bookshelfName, books, likeCount }: APIBookshelf) => {
  return (
    <div className="relative z-10 flex flex-col gap-[2.6rem] rounded-[2rem] bg-white pb-[1.5rem] pt-[2rem] shadow-[0px_0px_10px_0px_#D1D1D1]">
      <div className="flex flex-col gap-[1rem] px-[1.5rem]">
        <div className="text-md font-bold">{bookshelfName}</div>
        <Badge colorScheme="red" fontWeight="bold" size="small">
          <div className="flex items-center gap-[0.4rem]">
            <div className="h-[1.3rem] w-[1.3rem] fill-white">
              <IconHeart />
            </div>
            <div className="bold text-xs">{likeCount}</div>
          </div>
        </Badge>
      </div>
      <div className="z-10 flex gap-[0.6rem]">
        {books.map(book => (
          <InteractiveBook key={book.bookId} {...book} />
        ))}
      </div>
      <div className="absolute bottom-0 z-0 w-full">
        <div className="h-[3rem] bg-[#F2ECDF]" />
        <div className="h-[1rem] rounded-b-[2rem] bg-[#F6F3EC]" />
      </div>
    </div>
  );
};

export default Bookshelf;
