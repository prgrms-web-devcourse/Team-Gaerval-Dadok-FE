import { APIBookshelf } from '@/types/bookshelf';

import Badge from '@/v1/base/Badge';
import BookShelf from '@/v1/bookShelf/BookShelf';

import { IconArrowRight, IconHeart } from '@public/icons';
import Link from 'next/link';

const ProfileBookshelfPresenter = ({
  bookshelfId,
  books,
  likeCount,
}: APIBookshelf) => {
  return (
    <div className="flex flex-col gap-[2rem]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">책장</h3>
        <div className="flex gap-[2rem]">
          <Badge
            colorScheme="red"
            fontWeight="bold"
            size="medium"
            isFilled={false}
          >
            <div className="flex items-center gap-[0.4rem]">
              <IconHeart className="h-[1.4rem] w-[1.4rem] fill-[#F56565]" />
              <div className="bold text-xs">{likeCount}</div>
            </div>
          </Badge>
          <Link href={`/bookshelf/${bookshelfId}`}>
            <IconArrowRight height="1.8rem" width="1.8rem" />
          </Link>
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
