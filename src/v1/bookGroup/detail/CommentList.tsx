import { IconHamburger } from '@public/icons';
import Avatar from '@/ui/Base/Avatar';
import { useBookGroupComments } from '@/queries/group/useGroupCommentsQuery';

const CommentList = ({ groupId }: { groupId: number }) => {
  const { data: comments } = useBookGroupComments(groupId);

  return (
    <div className="flex flex-col gap-[1rem]">
      {comments &&
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
              <MenuButton />
            </div>
            <Comment content={content} />
            <Divider />
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

const Divider = () => <p className=" border-b-black100 border-[0.05rem]"></p>;
