import { APIBookshelf } from '@/types/bookshelf';

import BookShelf from '@/v1/bookShelf/BookShelf';

import { IconArrowRight, IconHeart } from '@public/icons';
import Link from 'next/link';

const ProfileBookshelfPresenter = ({
  bookshelfId,
  books,
  likeCount,
}: APIBookshelf) => {
  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex items-center justify-between">
        <Link
          href={`/bookshelf/${bookshelfId}`}
          className="flex items-center gap-[0.5rem]"
        >
          <h3 className="font-body1-bold">책장</h3>
          <IconArrowRight height="1.3rem" width="1.3rem" />
        </Link>
        <div className="flex items-center gap-[0.3rem] px-[0.6rem] py-[0.2rem]">
          <IconHeart className=" fill-warning-800 stroke-warning-800" />
          <p className=" text-black-600 font-caption2-bold">{likeCount}</p>
        </div>
      </div>

      <BookShelf>
        <div className="w-app pb-[2.5rem] pt-[2rem] shadow-[0px_20px_20px_-16px_#D1D1D1]">
          <BookShelf.Background />
          <BookShelf.Books books={books} />
        </div>
      </BookShelf>
    </div>
  );
};

export default ProfileBookshelfPresenter;
