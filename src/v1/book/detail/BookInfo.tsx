import { APIBook } from '@/types/book';
import { IconBookmark } from '@public/icons';
import { useBookInfo } from '@/queries/book/useBookInfoQuery';
import useBookUserInfoQuery from '@/queries/book/useBookUserInfoQuery';

import Avatar, { AvatarGroup } from '@/v1/base/Avatar';
import Skeleton from '@/v1/base/Skeleton';
import BookCover from '@/v1/book/BookCover';

const BookInfo = ({ bookId }: { bookId: APIBook['bookId'] }) => {
  const { data } = useBookInfo(bookId);
  const { title, author, imageUrl, summary, bookUrl } = data;

  return (
    <div className="flex flex-col gap-[2rem] rounded-l-[1.5rem] bg-white p-[2rem] shadow-bookcard">
      <div className="flex items-end gap-[2rem]">
        <BookCover size="2xlarge" src={imageUrl} />

        <div className="flex flex-col gap-[0.5rem]">
          <BookmarkButton />
          <BookTitle title={title} />
          <BookAuthor author={author} />
        </div>
      </div>

      <BookSummary summary={summary} bookUrl={bookUrl} />
      <BookmarkUserInfo bookId={bookId} />
    </div>
  );
};

export default BookInfo;

const BookTitle = ({ title }: { title: string }) => (
  <p className="text-lg font-bold">{title}</p>
);

const BookAuthor = ({ author }: { author: string }) => (
  <p className="text-sm">{author}</p>
);

const BookmarkButton = () => {
  return (
    <IconBookmark
      className="mb-[0.5rem] h-[2.4rem] w-[2.4rem] cursor-pointer stroke-main-900 stroke-[0.15rem]"
      fill="white"
    />
  );
};

const BookSummary = ({
  summary,
  bookUrl,
}: {
  summary: string;
  bookUrl: string;
}) => (
  <p className="text-md">
    {summary}&nbsp;...&nbsp;
    {bookUrl && (
      <a target="_blank" href={bookUrl}>
        <span className="cursor-pointer text-main-900">더보기</span>
      </a>
    )}
  </p>
);

const BookmarkUserInfo = ({ bookId }: { bookId: APIBook['bookId'] }) => {
  const { data } = useBookUserInfoQuery(bookId);
  const { totalCount, users } = data;
  const avatarCount = users.length;

  return (
    <div className="flex items-center gap-[0.5rem]">
      {avatarCount !== 0 && (
        <AvatarGroup>
          {users.map(({ userId, profileImage }) => (
            <a key={userId} href={`/profile/${userId}`}>
              <Avatar src={profileImage} border />
            </a>
          ))}
        </AvatarGroup>
      )}
      <p className="text-sm">
        {getBookmarkedUserCountText(totalCount, avatarCount)}
      </p>
    </div>
  );
};

const getBookmarkedUserCountText = (
  totalCount: number,
  avatarCount: number
) => {
  const otherCount = totalCount - avatarCount;

  if (otherCount === 0 && totalCount === 0) {
    return '아직 이 책을 책장에 꽂은 사람이 없어요.';
  } else if (otherCount === 0) {
    return '님이 이 책을 책장에 꽂았어요.';
  }

  return `외 ${otherCount}명이 이 책을 책장에 꽂았어요.`;
};

export const BookInfoSkeleton = () => (
  <Skeleton>
    <div className="flex flex-col gap-[2rem] rounded-l-[1.5rem] bg-white p-[2rem] shadow-bookcard">
      <div className="flex items-end gap-[2rem]">
        <Skeleton.Rect width="14rem" height="19.6rem" rounded="medium" />
        <div className="flex flex-col gap-[1rem]">
          <Skeleton.Text fontSize="xlarge" width="16rem" />
          <Skeleton.Text fontSize="small" width="7rem" />
        </div>
      </div>
      <div className="flex flex-col gap-[0.7rem]">
        <Skeleton.Text width="100%" fontSize="medium" />
        <Skeleton.Text width="100%" fontSize="medium" />
        <Skeleton.Text width="100%" fontSize="medium" />
        <Skeleton.Text width="60%" fontSize="medium" />
      </div>
      <Skeleton.Text width="75%" fontSize="large" />
    </div>
  </Skeleton>
);
