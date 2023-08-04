import Link from 'next/link';
import { ReactElement, useMemo } from 'react';

type Props = {
  icon: ReactElement;
  label: string;
  href: string;
  isActive: boolean;
};

const getIconColorClasses = (isActive: boolean) => {
  return isActive
    ? 'fill-main-900 text-main-900'
    : 'fill-placeholder text-placeholder';
};

const BottomNavigationItem = ({ icon, label, href, isActive }: Props) => {
  const computedClasses = useMemo(() => {
    const iconColorClass = getIconColorClasses(isActive);

    return iconColorClass;
  }, [isActive]);

  return (
    <Link type="button" href={href}>
      <div
        className={`flex h-[4.4rem] w-[4.6rem] flex-col items-center justify-center text-xs font-bold ${computedClasses}`}
      >
        {icon}
        {label}
      </div>
    </Link>
  );
};

export default BottomNavigationItem;
