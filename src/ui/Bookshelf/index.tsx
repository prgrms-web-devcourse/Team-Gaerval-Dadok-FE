import { APIBookshelf } from '@/types/bookshelf';
import { IconHeart } from '@public/icons';
import Badge from '../Base/Badge';
import BookInBookshelf from './Book';

const Bookshelf = ({ bookshelfName, books, likeCount }: APIBookshelf) => {
  return (
    <div className="relative rounded-[2rem] pb-[2.5rem] pt-[2rem] shadow-[0px_0px_10px_0px_#D1D1D1]">
      <div className="absolute bottom-0 w-full">
        <div className="h-[3rem] bg-[#F2ECDF] shadow-[0px_-3px_8px_0px_#F1F1F1_inset]" />
        <div className="h-[1rem] rounded-b-[2rem] bg-[#F6F3EC] shadow-[0px_-1px_8px_-4.5px_#494949]" />
      </div>
      <div className="flex flex-col gap-[2.6rem] bg-white ">
        <div className="flex flex-col gap-[1rem] px-[1.5rem]">
          <div className="text-md font-bold">{bookshelfName}</div>
          <Badge colorScheme="red" fontWeight="bold" size="small">
            <div className="flex items-center gap-[0.4rem]">
              <IconHeart fill="white" height="1.3rem" w="1.3rem" />
              <div className="bold text-xs">{likeCount}</div>
            </div>
          </Badge>
        </div>
        <div className="flex justify-between px-[2rem]">
          {books.map(book => (
            <BookInBookshelf key={book.bookId} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
