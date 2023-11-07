import Image from 'next/image';

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
      <Avatar profileImageSrc={profileImageSrc} name={name} />
      <div className="flex flex-col">
        <Name text={name} isMarked={isOwner} />
        <Job group={job.group} name={job.name} />
      </div>
    </div>
  );
};

export default MemberItem;

// FIXME: Avatar Base 컴포넌트로 변경
const Avatar = ({
  profileImageSrc,
  name,
}: {
  profileImageSrc: string;
  name: string;
}) => (
  <span
    className={`relative h-[3.5rem] w-[3.5rem] ${
      profileImageSrc ? 'bg-white' : 'bg-black-400'
    }`}
  >
    {profileImageSrc && (
      <Image alt={name} src={profileImageSrc} fill className="rounded-full" />
    )}
  </span>
);

const Name = ({ text, isMarked }: { text: string; isMarked: boolean }) => (
  <p className="text-sm font-bold">
    {text} {isMarked && ' 👑'}
  </p>
);

const Job = ({ group, name }: { group: string; name: string }) => (
  <p className="text-xs text-placeholder">
    {group} • {name}
  </p>
);
