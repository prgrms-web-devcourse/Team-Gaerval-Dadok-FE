import { IconHamburger } from '@public/icons';
import Avatar from '@/ui/Base/Avatar';
import { useBookGroupComments } from '@/queries/group/useBookGroupCommentsQuery';
import { useMyProfileId } from '@/queries/user/useMyProfileQuery';
import { isAuthed } from '@/utils/helpers';

const CommentList = ({ groupId }: { groupId: number }) => {
  const { data: comments } = useBookGroupComments(groupId);
  const { data: myId } = useMyProfileId({ enabled: isAuthed() });

  return (
    <div className="flex flex-col gap-[1rem]">
      {comments.length ? (
        comments.map(({ id, writer, createdAt, content }) => (
          <div className="flex flex-col gap-[1.7rem] pt-[1rem]" key={id}>
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
            <Divider />
          </div>
        ))
      ) : (
        <p className="self-center whitespace-pre-line py-[2rem] text-center text-sm">
          {`아직 게시글이 없어요.
          가장 먼저 게시글을 남겨보세요!`}
        </p>
      )}
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

const Divider = () => <p className=" border-[0.05rem] border-b-[#eaf1fa]"></p>;
