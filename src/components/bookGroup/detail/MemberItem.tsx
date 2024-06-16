import Avatar from '@/components/common/Avatar';

interface MemberItemProps {
  profileImageSrc: string;
  name: string;
  job: { group: string; name: string };
  isOwner: boolean;
}

const MemberItem = ({
  profileImageSrc,
  name,
  job,
  isOwner,
}: MemberItemProps) => {
  return (
    <div className="flex gap-[0.8rem]">
      <Avatar src={profileImageSrc} name={name} />
      <div className="flex flex-col">
        <Name text={name} isMarked={isOwner} />
        <Job group={job.group} name={job.name} />
      </div>
    </div>
  );
};

export default MemberItem;

const Name = ({ text, isMarked }: { text: string; isMarked: boolean }) => (
  <p className="font-body2-bold">
    {text} {isMarked && ' 👑'}
  </p>
);

const Job = ({ group, name }: { group: string; name: string }) => (
  <p className="text-placeholder font-caption1-regular">
    {group} • {name}
  </p>
);
