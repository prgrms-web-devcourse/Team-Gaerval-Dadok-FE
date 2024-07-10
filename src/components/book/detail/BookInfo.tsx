import { APIBook } from '@/types/book';
import { IconBookmark } from '@public/icons';
import { useBookInfo } from '@/queries/book/useBookInfoQuery';
import useBookmarkUserQuery from '@/queries/book/useBookmarkUserQuery';
import useUpdateBookmarkMutation from '@/queries/book/useUpdateBookmarkMutation';
import useToast from '@/components/common/Toast/useToast';
import { checkAuthentication } from '@/utils/helpers';

import Avatar, { AvatarGroup } from '@/components/common/Avatar';
import Skeleton from '@/components/common/Skeleton';
import BookCover from '@/components/book/BookCover';

const BookInfo = ({ bookId }: { bookId: APIBook['bookId'] }) => {
  const { data } = useBookInfo(bookId);
  const { title, author, imageUrl, summary, bookUrl } = data;

  return (
    <div className="flex flex-col gap-[2rem] rounded-l-[1.5rem] bg-white p-[2rem] shadow-bookcard">
      <div className="flex items-end gap-[2rem]">
        <BookCover size="2xlarge" src={imageUrl} />

        <div className="flex min-w-0 flex-col gap-[0.5rem]">
          <BookmarkButton bookId={bookId} />
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
  <p className="font-subheading-bold">{title}</p>
);

const BookAuthor = ({ author }: { author: string }) => (
  <p className="font-body2-regular">{author}</p>
);

const BookmarkButton = ({ bookId }: { bookId: APIBook['bookId'] }) => {
  const isAuthenticated = checkAuthentication();
  const { show: showToast } = useToast();

  const { data } = useBookmarkUserQuery(bookId);
  const { isInMyBookshelf } = data;

  const { mutate } = useUpdateBookmarkMutation(bookId);

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      // TODO: 로그인 유도 모달로 변경
      showToast({ message: '로그인 후에 책을 꽂을 수 있어요' });
      return;
    }

    mutate(!isInMyBookshelf);
  };

  return (
    <IconBookmark
      className={`mb-[0.5rem] h-[2.4rem] w-[2.4rem] cursor-pointer stroke-main-900 stroke-[0.15rem] ${
        isInMyBookshelf ? 'fill-main-900' : 'fill-white'
      }`}
      onClick={handleButtonClick}
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
  <p className="break-all">
    {summary}&nbsp;...&nbsp;
    {bookUrl && (
      <a target="_blank" href={bookUrl}>
        <span className="cursor-pointer text-main-900">더보기</span>
      </a>
    )}
  </p>
);

const BookmarkUserInfo = ({ bookId }: { bookId: APIBook['bookId'] }) => {
  const { data } = useBookmarkUserQuery(bookId);
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
      <p className="font-body2-regular">
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
        <div className="flex-shrink-0">
          <Skeleton.Rect width="14rem" height="19.6rem" rounded="medium" />
        </div>
        <div className="flex flex-col gap-[1rem] overflow-x-clip">
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
