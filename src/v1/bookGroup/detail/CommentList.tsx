import { IconHamburger } from '@public/icons';
import Avatar from '@/v1/base/Avatar';
import { useBookGroupComments } from '@/queries/group/useBookGroupCommentsQuery';
import { useMyProfileId } from '@/queries/user/useMyProfileQuery';
import { isAuthed } from '@/utils/helpers';
import { useBookGroup } from '@/queries/group/useBookGroupQuery';

const CommentList = ({ groupId }: { groupId: number }) => {
  const { data: bookGroupInfo } = useBookGroup(groupId);
  const { data: comments } = useBookGroupComments(groupId);
  const { data: myId } = useMyProfileId({ enabled: isAuthed() });
  const { isPublic, isMember } = bookGroupInfo;

  if (!isPublic && !isMember) {
    return (
      <p className="py-[2rem] text-center text-sm">
        {`멤버만 볼 수 있어요 🥲`}
      </p>
    );
  }

  if (comments.length === 0) {
    return (
      <p className="self-center whitespace-pre-line py-[2rem] text-center text-sm">
        {`아직 게시글이 없어요.
          가장 먼저 게시글을 남겨보세요!`}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-[1rem]">
      {comments.map(({ id, writer, createdAt, content }) => (
        <div className="flex flex-col gap-[1rem] py-[1rem]" key={id}>
          <div className="flex gap-[1rem]">
            <Avatar
              src={writer.profileImageSrc}
              name={writer.name}
              size="medium"
            />
            <div className="flex flex-grow flex-col">
              <Name name={writer.name} />
              <Date date={createdAt} />
            </div>
            {writer.id === myId && <MenuButton />}
          </div>
          <Comment content={content} />
        </div>
      ))}
    </div>
  );
};

export default CommentList;

const Name = ({ name }: { name: string }) => (
  <p className="text-sm font-bold">{name}</p>
);

const Date = ({ date }: { date: string }) => (
  <p className="text-xs text-placeholder">{date}</p>
);

const MenuButton = () => {
  return (
    <span className="inline-block h-[2rem] w-[2rem] cursor-pointer">
      <IconHamburger />
    </span>
  );
};

const Comment = ({ content }: { content: string }) => (
  <p className="text-justify text-md">{content}</p>
);
