import { usePathname, useRouter } from 'next/navigation';

import useJoinBookGroup from '@/hooks/group/useJoinBookGroup';
import StickyFooter from '@/components/common/StickyFooter';
import Button from '@/components/common/Button';

const JoinBookGroupButton = ({ groupId }: { groupId: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isExpired, isMember, hasPassword, joinBookGroup, refetch } =
    useJoinBookGroup(groupId);

  const handleButtonClick = async () => {
    if (hasPassword) {
      router.replace(`${pathname}/join`);
      return;
    }

    joinBookGroup({ onSuccess: refetch });
  };

  if (isMember) {
    return null;
  }

  if (isExpired) {
    return (
      <StickyFooter>
        <Button size="full" colorScheme="grey" disabled>
          모임이 종료되었어요.
        </Button>
      </StickyFooter>
    );
  }

  return (
    <StickyFooter>
      <Button size="full" onClick={handleButtonClick}>
        참여하기
      </Button>
    </StickyFooter>
  );
};

export default JoinBookGroupButton;
