import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconArrowLeft } from '@public/icons';
import MemberItem from '@/components/bookGroup/detail/MemberItem';
import Button from '@/components/common/Button';

type Member = {
  id: number;
  profileImageSrc: string;
  name: string;
  job: { group: string; name: string };
  isOwner: boolean;
};

interface ShortMemberInfoProps {
  members: Member[];
}

const MEMBER_SHOW_LIMIT = 3;

const ShortMemberInfo = ({ members }: ShortMemberInfoProps) => {
  return (
    <div className="flex flex-col gap-[2rem]">
      <Heading text="멤버" />
      <MemberList members={members.slice(0, MEMBER_SHOW_LIMIT)} />
      <ViewAllButton />
    </div>
  );
};

export default ShortMemberInfo;

const Heading = ({ text }: { text: string }) => (
  <p className="font-subheading-bold">{text}</p>
);

const MemberList = ({ members }: { members: Member[] }) => (
  <div className="flex flex-col gap-[1rem]">
    {members.map(({ id, ...memberItemProps }) => (
      <MemberItem key={id} {...memberItemProps} />
    ))}
  </div>
);

const ViewAllButton = () => {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/members`}>
      <Button size="full" colorScheme="main-light">
        <span className="mr-[0.5rem] text-black-700 font-body2-bold">
          전체보기
        </span>
        <IconArrowLeft className="inline-block h-[1rem] w-[1rem] rotate-180" />
      </Button>
    </Link>
  );
};
