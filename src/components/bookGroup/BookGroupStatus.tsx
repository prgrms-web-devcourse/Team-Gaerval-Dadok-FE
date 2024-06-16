import { DdayStatus } from '@/types/dday';

import Badge from '@/components/common/Badge';
import { getDdayCount } from '@/utils/date';

const getDdayStatus = (ddayByStart: number, ddayByEnd: number) => {
  if (ddayByStart > 0) {
    return 'before' as const;
  } else if (ddayByStart === 0 && ddayByEnd > 0) {
    return 'dday' as const;
  } else if (ddayByStart < 0 && ddayByEnd >= 0) {
    return 'ongoing' as const;
  } else {
    return 'end' as const;
  }
};

const getBadgeProps = (status: DdayStatus, ddayCount: number) => {
  switch (status) {
    case 'before':
      return {
        colorScheme: 'main' as const,
        isFilled: true,
        text: `D-${ddayCount}`,
      };
    case 'dday':
      return {
        colorScheme: 'main' as const,
        isFilled: false,
        text: 'D-day',
      };
    case 'ongoing':
      return {
        colorScheme: 'main' as const,
        isFilled: true,
        text: '진행중',
      };
    case 'end':
      return {
        colorScheme: 'grey' as const,
        isFilled: true,
        text: '모임종료',
      };
  }
};

const BookGroupStatus = ({ start, end }: { start: string; end: string }) => {
  const ddayByStart = getDdayCount(new Date(start));
  const ddayByEnd = getDdayCount(new Date(end));
  const ddayStatus = getDdayStatus(ddayByStart, ddayByEnd);

  const { text, ...badgeProps } = getBadgeProps(ddayStatus, ddayByStart);

  return (
    <Badge fontWeight="bold" {...badgeProps}>
      {text}
    </Badge>
  );
};

export default BookGroupStatus;
